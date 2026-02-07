# Lords of the Pit

Static website for the Chicago-based Old School Magic: the Gathering club. Features blog posts, event coverage, podcast archive, and historical MTG documents.

**Live Site:** [lordsofthepit.com](https://lordsofthepit.com)

## Quick Start

### Prerequisites

- node.js 20.x
- git

### Setup

```zsh
git clone https://github.com/tyleretters/lordsofthepit.com.git
cd lordsofthepit.com
npm i
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
