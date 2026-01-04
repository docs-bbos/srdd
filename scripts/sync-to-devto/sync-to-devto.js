#!/usr/bin/env node

/**
 * Sync Jekyll posts to Dev.to
 * 
 * This script:
 * 1. Reads Jekyll markdown posts from your repo
 * 2. Checks if they exist on Dev.to (by canonical URL)
 * 3. Creates new posts or updates existing ones
 * 
 * Required environment variables:
 * - DEVTO_API_KEY: Your Dev.to API key (from https://dev.to/settings/extensions)
 * - SITE_URL: Your GitHub Pages URL (e.g., https://username.github.io/repo)
 */

const fs = require('fs');
const path = require('path');
const matter = require('gray-matter');

const DEVTO_API_KEY = process.env.DEVTO_API_KEY;
const SITE_URL = process.env.SITE_URL || '';
const POSTS_DIR = process.env.POSTS_DIR || './_posts';
const PUBLISH_BY_DEFAULT = process.env.PUBLISH_BY_DEFAULT === 'true';

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
  
  // Extract slug from filename (e.g., 2024-01-15-my-post.md -> my-post)
  const filename = path.basename(filePath, path.extname(filePath));
  const slugMatch = filename.match(/^\d{4}-\d{2}-\d{2}-(.+)$/);
  const slug = slugMatch ? slugMatch[1] : filename;
  
  return {
    title: frontMatter.title,
    body: body.trim(),
    tags: frontMatter.tags || frontMatter.categories || [],
    series: frontMatter.series || null,
    description: frontMatter.description || frontMatter.excerpt || null,
    coverImage: frontMatter.image || frontMatter.cover_image || null,
    slug,
    date: frontMatter.date,
    // Dev.to specific front matter (optional in Jekyll posts)
    devto_published: frontMatter.devto_published,
    devto_series: frontMatter.devto_series,
    devto_tags: frontMatter.devto_tags,
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

function buildDevtoArticle(post, canonicalUrl, published) {
  // Normalize tags: Dev.to allows max 4 tags, lowercase, no spaces
  let tags = post.devto_tags || post.tags;
  if (typeof tags === 'string') {
    tags = tags.split(',').map(t => t.trim());
  }
  tags = tags
    .slice(0, 4)
    .map(t => t.toLowerCase().replace(/\s+/g, '').replace(/[^a-z0-9]/g, ''));

  const article = {
    title: post.title,
    body_markdown: post.body,
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

async function syncPost(post, existingArticles) {
  const canonicalUrl = buildCanonicalUrl(post.slug);
  const existingArticle = findArticleByCanonicalUrl(existingArticles, canonicalUrl);
  
  // Determine if should be published on Dev.to
  const shouldPublish = post.devto_published !== undefined 
    ? post.devto_published 
    : PUBLISH_BY_DEFAULT;

  const articleData = buildDevtoArticle(post, canonicalUrl, shouldPublish);

  try {
    if (existingArticle) {
      // Update existing article
      console.log(`Updating: "${post.title}" (ID: ${existingArticle.id})`);
      await devtoRequest(`/articles/${existingArticle.id}`, {
        method: 'PUT',
        body: JSON.stringify({ article: articleData }),
      });
      console.log(`  ✓ Updated successfully`);
      return { action: 'updated', title: post.title };
    } else {
      // Create new article
      console.log(`Creating: "${post.title}"`);
      const created = await devtoRequest('/articles', {
        method: 'POST',
        body: JSON.stringify({ article: articleData }),
      });
      console.log(`  ✓ Created successfully (ID: ${created.id})`);
      return { action: 'created', title: post.title, id: created.id };
    }
  } catch (error) {
    console.error(`  ✗ Failed: ${error.message}`);
    return { action: 'failed', title: post.title, error: error.message };
  }
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

  // Sync each post
  const results = { created: 0, updated: 0, failed: 0 };
  
  for (const postFile of postFiles) {
    const post = parseJekyllPost(postFile);
    
    // Skip posts explicitly marked to not sync
    if (post.devto_published === false && !findArticleByCanonicalUrl(existingArticles, buildCanonicalUrl(post.slug))) {
      console.log(`Skipping: "${post.title}" (devto_published: false)`);
      continue;
    }

    const result = await syncPost(post, existingArticles);
    results[result.action === 'created' ? 'created' : result.action === 'updated' ? 'updated' : 'failed']++;
    
    await sleep(RATE_LIMIT_DELAY);
  }

  // Summary
  console.log('');
  console.log('=== Summary ===');
  console.log(`Created: ${results.created}`);
  console.log(`Updated: ${results.updated}`);
  console.log(`Failed: ${results.failed}`);

  if (results.failed > 0) {
    process.exit(1);
  }
}

main().catch(error => {
  console.error('Fatal error:', error);
  process.exit(1);
});
