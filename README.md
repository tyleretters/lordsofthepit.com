# Lords of the Pit

Static website for the Chicago-based Old School Magic: the Gathering club. Features blog posts, event coverage, podcast archive, and historical MTG documents.

**Live Site:** [lordsofthepit.com](https://lordsofthepit.com)

## Tech Stack

- **Static Site Generator:** Eleventy 3.1.2
- **Template Engine:** Liquid
- **Styling:** Tailwind CSS 3.4.19
- **Deployment:** Cloudflare Pages (auto-deploy on push to `main`)
- **Version Control:** Git with Git LFS for images
- **Node Version:** 20.x

## Quick Start

### Prerequisites

- Node.js 20.x
- Git with Git LFS installed (`brew install git-lfs` on macOS)

### Setup

```bash
# Clone repository
git clone https://github.com/tyleretters/lordsofthepit.com.git
cd lordsofthepit.com

# Initialize Git LFS
git lfs install
git lfs pull

# Install dependencies
npm install

# Start dev server
npm run dev
```

Visit `http://localhost:8080`

## Development

### Available Scripts

```bash
npm run dev          # Start dev server with hot reload
npm run build        # Production build
npm run build:css    # Compile Tailwind CSS once
npm run watch:css    # Watch Tailwind CSS for changes
npm run pretty       # Format code with Prettier
```

### Project Structure

```text
/
├── src/
│   ├── includes/          # Reusable components & layouts
│   │   ├── layouts/       # Page layouts (default, post, page, etc.)
│   │   ├── header.html    # Site navigation
│   │   ├── footer.html    # Site footer
│   │   └── aside.html     # Sidebar with archives
│   ├── posts/             # Blog posts (113+ posts)
│   ├── pages/             # Static pages
│   ├── data/              # Global data (site.json)
│   └── assets/
│       ├── images/        # Images (Git LFS, 3.1GB+)
│       └── stylesheets/   # Tailwind CSS
├── dist/                  # Generated site (gitignored)
├── _editors/              # Post templates for writers
└── eleventy.config.js     # Eleventy configuration
```

## Writing Content

### Adding a New Post

1. Copy template: `_editors/2020-MM-DD-writeup-template.md`
2. Rename to: `src/posts/YYYY-MM-DD-title.md`
3. Update frontmatter:

   ```yaml
   ---
   layout: post
   author: Your Name
   title: "Post Title"
   date: YYYY-MM-DD
   category: blog
   ---
   ```

4. Add images to `src/assets/images/event-name/`
5. Write content in Markdown
6. Reference images: `![alt](/assets/images/event-name/photo.jpg)`
7. Commit and push to `main`

### Frontmatter Requirements

- `layout`: Usually `post` for blog posts, `page` for static pages
- `author`: Writer's name
- `title`: Post title
- `date`: Date in `YYYY-MM-DD` format (strict requirement)
- `category`: Usually `blog`

## Images & Git LFS

All images are stored in `src/assets/images/` and tracked with Git LFS.

- Total images: ~1,746 files (~3.1GB)
- LFS configured in `.gitattributes` for jpg, jpeg, png, gif
- Images are **not** committed directly to git history
- On clone, run `git lfs pull` to download image files

## Deployment

- **Automatic:** Push to `main` triggers Cloudflare Pages deployment
- **Build Command:** `npm run build`
- **Output Directory:** `dist`
- **Build Time:** ~2-3 minutes (includes npm install + build)

## Code Style

- **JavaScript:** ES6 modules, formatted with Prettier
- **Templates:** Liquid syntax with quoted includes
- **CSS:** Tailwind utility classes + custom components
- Run `npm run pretty` before committing

## Migration History

### February 2026: Jekyll → Eleventy

- Migrated from Jekyll (Ruby) to Eleventy (Node.js)
- Converted to ES6 modules
- Restructured to `src/` directory
- Changed output from `_site` to `dist`
- Build time improved from ~10-15s to ~3-4s

### February 2026: Bootstrap → Tailwind CSS

- Migrated from Bootstrap 4.5 (CDN) to Tailwind CSS 3.4.19
- Maintained identical visual design (black background, white text, red links)
- Custom theme matches original color scheme

### February 2026: Git History Cleanup

- Removed 6.3GB of image blobs from git history using `git-filter-repo`
- Set up proper Git LFS tracking for all images
- Reduced clone size from 6.3GB to ~3.2GB

See [MIGRATION.md](MIGRATION.md) for full details.

## Testing Checklist

Before major changes:

- [ ] Run `npm run build` - must succeed
- [ ] Check homepage shows latest posts
- [ ] Navigate to individual post - titles, authors, next/prev links work
- [ ] Visit `/archives` - all posts listed by year
- [ ] Check mobile responsiveness
- [ ] Verify images load (Git LFS pulled)
- [ ] Test RSS feed: `/feed.xml`
- [ ] Run `npm run pretty` to ensure formatting

## Contributing

This site serves a community of Magic: the Gathering players. Content is king. Keep the infrastructure simple and the writer workflow unchanged.

**Primary maintainer:** @tyleretters

## License

Content and code © Lords of the Pit
