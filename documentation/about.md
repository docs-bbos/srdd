---
title: About This Documentation Infrastructure
---

# About This Documentation Infrastructure

> ← Back to [SRDD entry page]({{devto:index}})

This page describes how the SRDD documentation is structured, built, and published.

## Documentation Source

All documentation lives as Markdown files in the `./documentation` directory of the [GitHub repository](https://github.com/docs-bbos/srdd). This is the single source of truth.

```
documentation/
├── index.md              # Entry point / overview
├── pitches.md            # Various length summaries
├── SRDD-part1-of-4.md    # Article series
├── SRDD-part2-of-4.md
├── SRDD-part3-of-4.md
├── SRDD-part4-of-4.md
├── CONTRIBUTING.md       # Contribution guide
├── about.md              # This file
└── .sync-state.json      # Dev.to sync state (auto-generated)
```

Each Markdown file uses YAML front matter for metadata (title, description, etc.) and standard GitHub-flavored Markdown for content.

## Cross-Document Linking

Documents use a placeholder syntax for internal links:

```markdown
See [Part 1]({{devto:SRDD-part1-of-4}}) for details.
```

The `{{devto:slug}}` pattern gets transformed differently depending on the target platform:

| Platform | Transformation |
|----------|----------------|
| GitHub Pages | `{{devto:slug}}` → `./slug.md` |
| Dev.to | `{{devto:slug}}` → actual Dev.to URL (e.g., `https://dev.to/bbos/...`) |

This allows documents to link to each other without hard-coding URLs that differ across platforms.

## GitHub Actions Pipeline

A single workflow (`.github/workflows/deploy-and-sync.yml`) handles all publishing:

### Step 1: Build for GitHub Pages

```yaml
- name: Transform devto placeholders for GHP
  run: |
    find ./documentation -name "*.md" -exec sed -i -E \
      's/\{\{devto:([^}]+)\}\}/.\/\1.md/g' {} \;

- name: Build with Jekyll
  uses: actions/jekyll-build-pages@v1
  with:
    source: ./documentation
    destination: ./_site
```

The pipeline:
1. Copies assets into the documentation directory
2. Transforms `{{devto:slug}}` placeholders to relative `.md` links
3. Builds with Jekyll
4. Deploys to GitHub Pages

### Step 2: Sync to Dev.to

After GitHub Pages deployment completes:

```yaml
sync-to-devto:
  needs: deploy  # Run after deploy so canonical URLs are live
  steps:
    - name: Sync posts to Dev.to
      env:
        DEVTO_API_KEY: ${{ secrets.DEVTO_API_KEY }}
        SITE_URL: ${{ vars.SITE_URL }}
```

The sync script (`scripts/sync-to-devto/sync-to-devto.js`) performs a **two-pass sync**:

#### Pass 1: Create/Update Articles

For each Markdown file:
1. Parse front matter and content
2. Build canonical URL (pointing to GitHub Pages)
3. Transform content (absolute URLs for images, strip styles)
4. Create or update the Dev.to article via API
5. Capture the returned Dev.to URL

#### Pass 2: Resolve Cross-Links

Dev.to generates URLs with unpredictable suffixes (e.g., `my-post-4k2n`). After Pass 1, we have a map of `slug → actual URL`. Pass 2:

1. Re-parses documents containing `{{devto:slug}}` placeholders
2. Replaces placeholders with actual Dev.to URLs from the map
3. Updates those articles again with resolved links

```javascript
// URL map built during Pass 1
{
  "index": "https://dev.to/bbos/srdd-is-the-best...-4k2n",
  "SRDD-part1-of-4": "https://dev.to/bbos/why-srdd-exists-2j8m",
  // ...
}
```

This two-pass approach ensures all cross-references resolve correctly despite Dev.to's dynamic URL generation.

### Incremental Sync

The sync script only uploads posts that have changed, reducing API calls and speeding up the pipeline.

**How it works:**

1. Each post's content is hashed (SHA-256, truncated to 16 chars)
2. Hashes are stored in `documentation/.sync-state.json`
3. On each run, current hashes are compared with stored hashes
4. Only posts with different hashes are synced
5. The updated state file is committed back to the repository

```json
// .sync-state.json
{
  "index": { "hash": "a1b2c3d4e5f67890", "syncedAt": "2026-01-07T10:00:00Z" },
  "pitches": { "hash": "f0e1d2c3b4a59687", "syncedAt": "2026-01-07T10:00:00Z" }
}
```

**Force full sync:**

To sync all posts regardless of changes, set the `FORCE_SYNC` environment variable:

```yaml
env:
  FORCE_SYNC: 'true'
```

Or run locally with the `--force` flag:

```bash
node sync-to-devto.js --force
```

## Canonical URLs

Every article on Dev.to includes a `canonical_url` pointing to the GitHub Pages version:

```
canonical_url: https://docs-bbos.github.io/srdd/SRDD-part1-of-4/
```

This tells search engines that GitHub Pages is the authoritative source. Benefits:

- **SEO consolidation**: Search rankings accrue to one URL
- **Platform flexibility**: Content can appear on Dev.to, Medium, or future platforms
- **Single source of truth**: Readers always know where to find the canonical version

## Adding New Documentation

To add a new page:

1. Create `documentation/new-page.md` with appropriate front matter
2. Link from other pages using `{{devto:new-page}}`
3. Commit and push to `main`
4. The pipeline automatically deploys to GitHub Pages and syncs to Dev.to

## Environment Configuration

The pipeline requires:

| Secret/Variable | Purpose |
|-----------------|---------|
| `DEVTO_API_KEY` | Dev.to API key from [dev.to/settings/extensions](https://dev.to/settings/extensions) |
| `SITE_URL` | GitHub Pages URL (e.g., `https://docs-bbos.github.io/srdd`) |

---

*This infrastructure enables "write once, publish everywhere" for living documentation that evolves with the methodology.*
