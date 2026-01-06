#!/usr/bin/env node

/**
 * Sync Jekyll posts to Dev.to
 *
 * This script:
 * 1. Reads Jekyll markdown posts from your repo
 * 2. Checks if they exist on Dev.to (by canonical URL)
 * 3. Creates new posts or updates existing ones
 * 4. Only syncs posts that have changed (via content hash comparison)
 *
 * Required environment variables:
 * - DEVTO_API_KEY: Your Dev.to API key (from https://dev.to/settings/extensions)
 * - SITE_URL: Your GitHub Pages URL (e.g., https://username.github.io/repo)
 *
 * Optional environment variables:
 * - FORCE_SYNC: Set to 'true' to sync all posts regardless of changes
 */

const fs = require('fs');
const path = require('path');
const crypto = require('crypto');
const matter = require('gray-matter');

const DEVTO_API_KEY = process.env.DEVTO_API_KEY;
const SITE_URL = process.env.SITE_URL || '';
const POSTS_DIR = process.env.POSTS_DIR || './_posts';
const PUBLISH_BY_DEFAULT = process.env.PUBLISH_BY_DEFAULT === 'true';
const DEBUG_OUTPUT = process.env.DEBUG_OUTPUT !== 'false'; // default true
const FORCE_SYNC = process.env.FORCE_SYNC === 'true' || process.argv.includes('--force');

// Sync state file path (relative to POSTS_DIR)
const SYNC_STATE_FILE = path.join(POSTS_DIR, '.sync-state.json');

// Ensure tmp directory exists
const TMP_DIR = path.join(process.cwd(), '..', 'tmp');
if (DEBUG_OUTPUT && !fs.existsSync(TMP_DIR)) {
  fs.mkdirSync(TMP_DIR, { recursive: true });
}

// Load defaults from Jekyll _config.yml if it exists
function loadJekyllDefaults() {
  const configPaths = [
    path.join(POSTS_DIR, '..', '_config.yml'),
    path.join(POSTS_DIR, '_config.yml'),
  ];
  
  for (const configPath of configPaths) {
    if (fs.existsSync(configPath)) {
      try {
        const configContent = fs.readFileSync(configPath, 'utf-8');
        const config = require('js-yaml').load(configContent);
        
        if (config?.defaults) {
          // Find defaults that apply to posts
          const postDefaults = config.defaults.find(d => 
            d.scope?.path?.includes('_posts') || 
            d.scope?.type === 'posts' ||
            !d.scope?.path // applies to all
          );
          if (postDefaults?.values) {
            console.log(`Loaded defaults from ${configPath}:`);
            console.log(`  devto_series: ${postDefaults.values.devto_series || '(not set)'}`);
            console.log(`  devto_tags: ${JSON.stringify(postDefaults.values.devto_tags) || '(not set)'}`);
            return postDefaults.values;
          }
        }
      } catch (e) {
        console.warn(`Warning: Could not parse ${configPath}: ${e.message}`);
      }
    }
  }
  return {};
}

const JEKYLL_DEFAULTS = loadJekyllDefaults();

// --- Sync State Management ---
// Tracks content hashes to detect changes and avoid unnecessary syncs

function loadSyncState() {
  if (fs.existsSync(SYNC_STATE_FILE)) {
    try {
      const content = fs.readFileSync(SYNC_STATE_FILE, 'utf-8');
      return JSON.parse(content);
    } catch (e) {
      console.warn(`Warning: Could not parse ${SYNC_STATE_FILE}: ${e.message}`);
    }
  }
  return {};
}

function saveSyncState(state) {
  fs.writeFileSync(SYNC_STATE_FILE, JSON.stringify(state, null, 2));
}

function computeContentHash(content) {
  return crypto.createHash('sha256').update(content).digest('hex').substring(0, 32);
}

function hasContentChanged(slug, currentHash, syncState) {
  const previousHash = syncState[slug]?.hash;
  return previousHash !== currentHash;
}

// Rate limiting: Dev.to allows 30 requests per 30 seconds
const RATE_LIMIT_DELAY = 1100; // ms between requests

const sleep = (ms) => new Promise(resolve => setTimeout(resolve, ms));

async function devtoRequest(endpoint, options = {}) {
  const url = `https://dev.to/api${endpoint}`;
  const response = await fetch(url, {
    ...options,
    headers: {
      'api-key': DEVTO_API_KEY,
      'Content-Type': 'application/json',
      'User-Agent': 'Jekyll-DevTo-Sync/1.0',
      ...options.headers,
    },
  });

  if (!response.ok) {
    const error = await response.text();
    throw new Error(`Dev.to API error ${response.status}: ${error}`);
  }

  return response.json();
}

async function getMyArticles() {
  // Get all published and unpublished articles
  const articles = [];
  let page = 1;
  
  while (true) {
    const batch = await devtoRequest(`/articles/me/all?page=${page}&per_page=100`);
    if (batch.length === 0) break;
    articles.push(...batch);
    page++;
    await sleep(RATE_LIMIT_DELAY);
  }
  
  return articles;
}

function findArticleByCanonicalUrl(articles, canonicalUrl) {
  return articles.find(a => a.canonical_url === canonicalUrl);
}

function parseJekyllPost(filePath) {
  const content = fs.readFileSync(filePath, 'utf-8');
  const { data: frontMatter, content: body } = matter(content);
  
  // Merge Jekyll defaults with front matter (front matter takes precedence)
  const merged = { ...JEKYLL_DEFAULTS, ...frontMatter };
  
  // Extract slug from filename (e.g., 2024-01-15-my-post.md -> my-post)
  const filename = path.basename(filePath, path.extname(filePath));
  const slugMatch = filename.match(/^\d{4}-\d{2}-\d{2}-(.+)$/);
  const slug = slugMatch ? slugMatch[1] : filename;
  
  return {
    title: merged.title,
    body: body.trim(),
    tags: merged.tags || merged.categories || [],
    series: merged.series || null,
    description: merged.description || merged.excerpt || null,
    coverImage: merged.image || merged.cover_image || null,
    slug,
    date: merged.date,
    // Dev.to specific front matter (optional in Jekyll posts)
    devto_published: merged.devto_published,
    devto_series: merged.devto_series,
    devto_tags: merged.devto_tags,
    devto_skip: merged.devto_skip,
  };
}

function buildCanonicalUrl(slug) {
  // Adjust this to match your Jekyll permalink structure
  // Common patterns:
  // - /:year/:month/:day/:title/
  // - /:title/
  // - /blog/:title/
  return `${SITE_URL}/${slug}/`;
}

function transformForDevto(markdown) {
  // Transform content for Dev.to compatibility
  
  return markdown
    // Strip <style>...</style> blocks (Dev.to has its own styling)
    .replace(/<style[\s\S]*?<\/style>/gi, '')
    // ![alt](./path/to/image.jpg) -> ![alt](SITE_URL/path/to/image.jpg)
    .replace(/!\[([^\]]*)\]\(\.\/([^)]+)\)/g, `![$1](${SITE_URL}/$2)`)
    // ![alt](path/to/image.jpg) where path doesn't start with http/https/data
    .replace(/!\[([^\]]*)\]\((?!https?:\/\/|data:)([^\/][^)]+)\)/g, `![$1](${SITE_URL}/$2)`)
    // ![alt](/path/to/image.jpg) -> ![alt](SITE_URL/path/to/image.jpg)
    .replace(/!\[([^\]]*)\]\(\/([^)]+)\)/g, `![$1](${SITE_URL}/$2)`)
    // <img src="./path"> or <img src="/path"> or <img src="path">
    .replace(/<img\s+([^>]*)src=["']\.\/([^"']+)["']/gi, `<img $1src="${SITE_URL}/$2"`)
    .replace(/<img\s+([^>]*)src=["']\/([^"']+)["']/gi, `<img $1src="${SITE_URL}/$2"`)
    .replace(/<img\s+([^>]*)src=["'](?!https?:\/\/|data:)([^"'\/][^"']+)["']/gi, `<img $1src="${SITE_URL}/$2"`)
    // Clean up any extra blank lines left behind
    .replace(/\n{3,}/g, '\n\n');
}

function buildDevtoArticle(post, canonicalUrl, published) {
  // Normalize tags: Dev.to allows max 4 tags, lowercase, no spaces
  let tags = post.devto_tags || post.tags;
  if (typeof tags === 'string') {
    tags = tags.split(',').map(t => t.trim());
  }
  tags = tags
    .slice(0, 4)
    .map(t => t.toLowerCase().replace(/\s+/g, '').replace(/[^a-z0-9]/g, ''));

  // Transform content for Dev.to (absolute URLs, strip styles)
  const bodyForDevto = transformForDevto(post.body);

  const article = {
    title: post.title,
    body_markdown: bodyForDevto,
    published: published,
    canonical_url: canonicalUrl,
    tags: tags,
  };

  if (post.description) {
    article.description = post.description;
  }

  if (post.devto_series || post.series) {
    article.series = post.devto_series || post.series;
  }

  // Note: cover_image must be a URL, not a local path
  if (post.coverImage && post.coverImage.startsWith('http')) {
    article.main_image = post.coverImage;
  }

  // Debug: save transformed output to tmp folder
  if (DEBUG_OUTPUT) {
    const debugFile = path.join(TMP_DIR, `${post.slug || 'unknown'}.devto.md`);
    const seriesLine = article.series ? `series: ${article.series}\n` : '';
    fs.writeFileSync(debugFile, `---\ntitle: ${post.title}\ncanonical_url: ${canonicalUrl}\ntags: ${tags.join(', ')}\n${seriesLine}published: ${published}\n---\n\n${bodyForDevto}`);
    console.log(`  Debug output saved to: ${debugFile}`);
  }

  return article;
}

function getJekyllPosts(postsDir) {
  if (!fs.existsSync(postsDir)) {
    console.log(`Posts directory not found: ${postsDir}`);
    return [];
  }

  return fs.readdirSync(postsDir)
    .filter(f => f.endsWith('.md') || f.endsWith('.markdown'))
    .map(f => path.join(postsDir, f));
}

async function syncPost(post, existingArticles, dryRun = false) {
  const canonicalUrl = buildCanonicalUrl(post.slug);
  const existingArticle = findArticleByCanonicalUrl(existingArticles, canonicalUrl);
  
  // Determine if should be published on Dev.to
  const shouldPublish = post.devto_published !== undefined 
    ? post.devto_published 
    : PUBLISH_BY_DEFAULT;

  const articleData = buildDevtoArticle(post, canonicalUrl, shouldPublish);

  if (dryRun) {
    return { 
      action: 'dryrun', 
      title: post.title, 
      slug: post.slug,
      id: existingArticle?.id,
      url: existingArticle?.url
    };
  }

  try {
    if (existingArticle) {
      // Update existing article
      console.log(`Updating: "${post.title}" (ID: ${existingArticle.id})`);
      const updated = await devtoRequest(`/articles/${existingArticle.id}`, {
        method: 'PUT',
        body: JSON.stringify({ article: articleData }),
      });
      console.log(`  ✓ Updated successfully`);
      return { action: 'updated', title: post.title, slug: post.slug, id: existingArticle.id, url: updated.url };
    } else {
      // Create new article
      console.log(`Creating: "${post.title}"`);
      const created = await devtoRequest('/articles', {
        method: 'POST',
        body: JSON.stringify({ article: articleData }),
      });
      console.log(`  ✓ Created successfully (ID: ${created.id})`);
      return { action: 'created', title: post.title, slug: post.slug, id: created.id, url: created.url };
    }
  } catch (error) {
    console.error(`  ✗ Failed: ${error.message}`);
    return { action: 'failed', title: post.title, slug: post.slug, error: error.message };
  }
}

// Check if any posts have devto link placeholders
function hasDevtoPlaceholders(posts) {
  return posts.some(post => /\{\{devto:[^}]+\}\}/.test(post.body));
}

// Replace {{devto:slug}} placeholders with actual URLs
function resolveDevtoLinks(markdown, urlMap) {
  return markdown.replace(/\{\{devto:([^}]+)\}\}/g, (match, slug) => {
    const url = urlMap[slug.trim()];
    if (url) {
      return url;
    }
    console.warn(`  Warning: No URL found for placeholder {{devto:${slug}}}`);
    return match; // Leave placeholder if no URL found
  });
}

async function main() {
  // Validate required env vars
  if (!DEVTO_API_KEY) {
    console.error('Error: DEVTO_API_KEY environment variable is required');
    console.error('Get your API key from: https://dev.to/settings/extensions');
    process.exit(1);
  }

  if (!SITE_URL) {
    console.error('Error: SITE_URL environment variable is required');
    console.error('Example: https://username.github.io/repo');
    process.exit(1);
  }

  console.log('=== Dev.to Sync ===');
  console.log(`Site URL: ${SITE_URL}`);
  console.log(`Posts directory: ${POSTS_DIR}`);
  console.log(`Publish by default: ${PUBLISH_BY_DEFAULT}`);
  console.log(`Force sync: ${FORCE_SYNC}`);
  console.log('');

  // Load sync state for incremental sync
  const syncState = loadSyncState();
  const syncStateEntries = Object.keys(syncState).length;
  if (syncStateEntries > 0) {
    console.log(`Loaded sync state with ${syncStateEntries} entries`);
  } else {
    console.log('No previous sync state found - will sync all posts');
  }
  console.log('');

  // Get existing Dev.to articles
  console.log('Fetching existing Dev.to articles...');
  const existingArticles = await getMyArticles();
  console.log(`Found ${existingArticles.length} existing articles on Dev.to`);
  console.log('');

  // Get Jekyll posts
  const postFiles = getJekyllPosts(POSTS_DIR);
  console.log(`Found ${postFiles.length} Jekyll posts to sync`);
  console.log('');

  // Parse all posts
  const posts = postFiles.map(f => parseJekyllPost(f));
  
  // Check if we need two-pass (posts have {{devto:slug}} placeholders)
  const needsTwoPass = hasDevtoPlaceholders(posts);
  if (needsTwoPass) {
    console.log('Detected {{devto:...}} placeholders - will do two-pass sync');
    console.log('');
  }

  // First pass: sync posts that have changed
  const results = { created: 0, updated: 0, skipped: 0, failed: 0 };
  const newSyncState = { ...syncState }; // Copy existing state

  // Pre-populate URL map from existing articles
  const urlMap = {}; // slug -> devto URL
  for (const post of posts) {
    const canonicalUrl = buildCanonicalUrl(post.slug);
    const existing = findArticleByCanonicalUrl(existingArticles, canonicalUrl);
    if (existing?.url) {
      urlMap[post.slug] = existing.url;
    }
  }

  for (const post of posts) {
    // Skip posts explicitly marked to not sync
    if (post.devto_skip === true) {
      console.log(`Skipping: "${post.title}" (devto_skip: true)`);
      continue;
    }

    // Compute content hash for change detection
    const contentHash = computeContentHash(post.title + post.body);

    // Check if content has changed (unless force sync)
    if (!FORCE_SYNC && !hasContentChanged(post.slug, contentHash, syncState)) {
      console.log(`Unchanged: "${post.title}" (skipping)`);
      results.skipped++;
      continue;
    }

    const result = await syncPost(post, existingArticles);

    // Store URL for link resolution
    if (result.url) {
      urlMap[post.slug] = result.url;
    }

    if (result.action === 'created') {
      results.created++;
      newSyncState[post.slug] = { hash: contentHash, syncedAt: new Date().toISOString() };
    } else if (result.action === 'updated') {
      results.updated++;
      newSyncState[post.slug] = { hash: contentHash, syncedAt: new Date().toISOString() };
    } else if (result.action === 'failed') {
      results.failed++;
      // Don't update sync state for failed posts
    }

    await sleep(RATE_LIMIT_DELAY);
  }

  // Second pass: if we have placeholders, resolve them and update
  if (needsTwoPass && Object.keys(urlMap).length > 0) {
    console.log('');
    console.log('=== Second Pass: Resolving {{devto:...}} links ===');
    console.log(`URL map: ${JSON.stringify(urlMap, null, 2)}`);
    console.log('');
    
    // Refresh existing articles to get any newly created ones
    const refreshedArticles = await getMyArticles();
    
    for (const post of posts) {
      if (!/\{\{devto:[^}]+\}\}/.test(post.body)) {
        continue; // Skip posts without placeholders
      }
      
      console.log(`Resolving links in: "${post.title}"`);
      
      // Replace placeholders in the original body
      post.body = resolveDevtoLinks(post.body, urlMap);
      
      // Debug: save second-pass output
      if (DEBUG_OUTPUT) {
        const debugFile = path.join(TMP_DIR, `${post.slug || 'unknown'}.devto.pass2.md`);
        const canonicalUrl = buildCanonicalUrl(post.slug);
        const bodyForDevto = transformForDevto(post.body);
        let tags = post.devto_tags || post.tags || [];
        if (typeof tags === 'string') tags = tags.split(',').map(t => t.trim());
        const seriesName = post.devto_series || post.series || '';
        const seriesLine = seriesName ? `series: ${seriesName}\n` : '';
        fs.writeFileSync(debugFile, `---\ntitle: ${post.title}\ncanonical_url: ${canonicalUrl}\ntags: ${tags.join(', ')}\n${seriesLine}---\n\n${bodyForDevto}`);
        console.log(`  Debug output saved to: ${debugFile}`);
      }
      
      // Sync again with resolved links
      const result = await syncPost(post, refreshedArticles);

      // Update sync state with resolved content hash
      if (result.action === 'updated') {
        const resolvedHash = computeContentHash(post.title + post.body);
        newSyncState[post.slug] = { hash: resolvedHash, syncedAt: new Date().toISOString() };
      }

      await sleep(RATE_LIMIT_DELAY);
    }
  }

  // Save sync state
  saveSyncState(newSyncState);
  console.log('');
  console.log(`Sync state saved to ${SYNC_STATE_FILE}`);

  // Summary
  console.log('');
  console.log('=== Summary ===');
  console.log(`Created: ${results.created}`);
  console.log(`Updated: ${results.updated}`);
  console.log(`Skipped (unchanged): ${results.skipped}`);
  console.log(`Failed: ${results.failed}`);

  if (results.failed > 0) {
    process.exit(1);
  }
}

main().catch(error => {
  console.error('Fatal error:', error);
  process.exit(1);
});