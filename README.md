# CRAGS.HK - Sunset Forest Bouldering Guide

A comprehensive digital guide for bouldering at Sunset Forest, Hong Kong. Built with Next.js and PageCMS, deployed on Cloudflare Pages.

## Features

- 🧗‍♂️ Browse problems by:
  - Grade (V0-V12)
  - Quality rating (1-3 stars)
  - Boulder location
  - Zone
- 🔍 Problem search
- 📱 Mobile-friendly interface
- 📸 High-quality problem photos
- 🗺️ Access information
- 📋 Easy problem sharing

## Tech Stack

- **Framework**: Next.js 13+ (App Router)
- **Content Management**: PageCMS
- **Styling**: SCSS Modules
- **Deployment**: Cloudflare Pages
- **Image Processing**: Sharp.js

## Project Structure

```
├── app/                  # Next.js app router
│   ├── _components/     # Shared UI components
│   ├── data/           # Data files
│   └── sunset-forest/  # Main climbing area routes
├── public/              # Static assets
│   ├── images/         # Original images
│   └── images-resized/ # Optimized images
├── src/                 # PageCMS content
│   ├── routes/         # Climbing routes
│   ├── boulders/       # Boulder information
│   └── zones/          # Zone information
└── programs/           # Utility scripts
```

## Development

1. Install dependencies:
   ```bash
   npm install
   ```

2. Run development server:
   ```bash
   npm run dev
   ```

3. Build static site:
   ```bash
   npm run build
   ```

## Image Processing

Optimize images for web:
```bash
node programs/resize-images.js
```

## Content Management

Content is managed through PageCMS. Files are located in the `src/` directory:
- Routes: `src/routes/`
- Boulders: `src/boulders/`
- Zones: `src/zones/`

## Deployment

The site is automatically deployed to Cloudflare Pages through GitHub Actions when changes are pushed to the main branch.

## TODO

- [ ] Implement search feature
- [ ] Add problem sharing functionality
- [ ] Improve approach page SEO
- [ ] Complete image alt text