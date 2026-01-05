# Jekyll to Dev.to Sync

Automatically sync your Jekyll blog posts to Dev.to with true update support.

## Features

- ✅ Creates new posts on Dev.to when you publish to Jekyll
- ✅ **Updates existing posts** when you edit them (by matching canonical URL)
- ✅ Sets canonical URL to your GitHub Pages site (good for SEO)
- ✅ Respects rate limits
- ✅ Optional: control which posts sync via front matter

## Setup

### 1. Get your Dev.to API Key

1. Go to https://dev.to/settings/extensions
2. Scroll to "DEV Community API Keys"
3. Generate a new key with a description like "Jekyll Sync"
4. Copy the key

### 2. Add secrets to your GitHub repo

Go to your repo → Settings → Secrets and variables → Actions

Add these:
- **Secret** `DEVTO_API_KEY`: Your Dev.to API key
- **Variable** `SITE_URL`: Your GitHub Pages URL (e.g., `https://username.github.io/repo`)

### 3. Add the sync script to your repo

Copy these files to your repo:
```
your-repo/
├── devto-sync/
│   ├── sync-to-devto.js
│   └── package.json
├── .github/
│   └── workflows/
│       └── deploy-and-sync.yml
└── medium/
    └── _posts/
        └── 2024-01-15-my-post.md
```

### 4. (Optional) Configure your Jekyll posts

Add optional front matter to control Dev.to behavior:

```yaml
---
title: My Amazing Post
date: 2024-01-15
tags: [javascript, tutorial]

# Dev.to specific (all optional)
devto_published: true      # false = sync as draft, true = publish immediately
devto_tags: [javascript, webdev, beginners]  # Override tags for Dev.to (max 4)
devto_series: "My Tutorial Series"           # Add to a series on Dev.to
---
```

## How it works

1. When you push to `main`, GitHub Actions builds your Jekyll site
2. After deploy, the sync script runs
3. For each post in `_posts/`:
   - Builds the canonical URL based on your slug
   - Checks if an article with that canonical URL exists on Dev.to
   - If yes → **updates it**
   - If no → **creates it**

## Configuration

Environment variables in the workflow:

| Variable | Required | Default | Description |
|----------|----------|---------|-------------|
| `DEVTO_API_KEY` | Yes | - | Your Dev.to API key |
| `SITE_URL` | Yes | - | Your site URL (no trailing slash) |
| `POSTS_DIR` | No | `./_posts` | Path to Jekyll posts |
| `PUBLISH_BY_DEFAULT` | No | `false` | Auto-publish new posts |

## Customizing the canonical URL

The script builds canonical URLs as: `{SITE_URL}/{slug}/`

If your Jekyll permalink structure is different, edit the `buildCanonicalUrl()` function in `sync-to-devto.js`.

Common Jekyll permalink patterns:
```javascript
// Default: /my-post/
return `${SITE_URL}/${slug}/`;

// With date: /2024/01/15/my-post/
return `${SITE_URL}/${date.slice(0,4)}/${date.slice(5,7)}/${date.slice(8,10)}/${slug}/`;

// Blog prefix: /blog/my-post/
return `${SITE_URL}/blog/${slug}/`;
```

## Running locally

```bash
cd devto-sync
npm install

export DEVTO_API_KEY="your-key"
export SITE_URL="https://username.github.io/repo"
export POSTS_DIR="../documentation"

npm run sync
```

## Troubleshooting

**Posts not updating?**
- The canonical URL must match exactly
- Check your Jekyll permalink structure matches `buildCanonicalUrl()`

**Rate limited?**
- The script waits 1.1s between API calls
- Dev.to allows 30 requests per 30 seconds

**Images not showing?**
- Dev.to requires absolute URLs for images
- Local paths like `/assets/image.png` won't work
- Use full URLs: `https://yoursite.com/assets/image.png`

## Limitations

- One-way sync only (Jekyll → Dev.to)
- Deleting a Jekyll post won't delete it from Dev.to
- Comments/reactions on Dev.to are independent
