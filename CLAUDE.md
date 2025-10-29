# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Technology Stack

This is a personal website built with:
- **Next.js 16** (React 18.2.0) - React Framework with SSG/ISR
- **Emotion** - CSS-in-JS styling solution
- **Contentful** - Headless CMS for blog posts (via SDK)
- **Netlify Functions + AWS DynamoDB** - Serverless backend for likes feature
- **Terraform** - Infrastructure as Code for AWS resources

## Development Commands

```bash
# Start development server (requires CONTENTFUL_KEY in .env.development)
npm run dev

# Build for production
npm run build

# Start production server locally
npm start

# Format code with Prettier
npm run format

# Run Next.js linter
npm run lint
```

**Required Environment Variables:**
- Development: `CONTENTFUL_KEY` (minimum)
- Production: `DYNAMO_LIKES_TABLE`, `NETLIFY_AWS_ACCESS_KEY_ID`, `NETLIFY_AWS_SECRET_ACCESS_KEY`, `REGION`, `S3_BUCKET`, `GA_TRACKING_ID`

## Architecture Overview

### Static Site Generation with ISR

This site uses Next.js SSG (Static Site Generation) with ISR (Incremental Static Regeneration):

1. **Blog Post Pages**: Dynamic routes in `pages/[slug].js`:
   - `getStaticPaths`: Generates paths for all blog posts at build time
   - `getStaticProps`: Fetches post data from Contentful SDK for each slug
   - ISR with `revalidate: 3600`: Auto-updates pages every hour without full rebuild
   - Fallback mode: `'blocking'` for new posts created after build

2. **Homepage**: Static page in `pages/index.js`:
   - `getStaticProps`: Fetches all blog posts for the post list
   - ISR enabled for automatic updates

3. **Data Sources**:
   - Blog content: Contentful CMS (space ID: `3fe7xd8j9mna`) via Contentful SDK
   - Images: Contentful CDN (direct URLs, optimized by next/image)
   - Likes data: AWS DynamoDB (runtime via Netlify Functions)

### Component Architecture

- **Layout Composition**: `src/components/layout.js` wraps all pages with Header, Footer, and Contact sections
- **Page Structure**:
  - `pages/index.js` - Homepage
  - `pages/[slug].js` - Dynamic blog post routes
  - `pages/_app.js` - Global app wrapper (Emotion, Typography, GA)
  - `pages/_document.js` - Custom HTML document structure
  - `pages/sitemap.xml.js` - Dynamic sitemap generation
- **Component Organization**:
  - `src/components/blog` - Blog-specific features (likes, code blocks, embeds)
  - `src/components/home` - Homepage sections (intro, about, post list)
  - `src/components/shared` - Reusable components (header, footer, contact, post)
- **Data Utilities**:
  - `lib/contentful.js` - Contentful SDK client and data fetching functions
  - `lib/config.js` - Site metadata configuration

### Rich Text Rendering

Blog post content from Contentful uses a custom parser (`src/utils/convertBlogBodyToElements.js`) that:
- Converts Contentful's rich text JSON to React components
- Handles embedded images (via Next.js Image with Contentful CDN URLs)
- Code blocks with syntax highlighting (react-syntax-highlighter)
- Tweet embeds
- Supports inline code with backtick syntax
- Processes `entry-hyperlink` nodes for inter-post linking

### Serverless Likes System

Interactive feature allowing users to like posts (implementation in `/netlify/functions`):
- Users can like each post up to 10 times
- Likes stored in DynamoDB with debounced writes (300ms)
- Local state persisted in localStorage
- API endpoints: `getLikes` (GET) and `postLike` (POST)

## Styling Approach

- **CSS-in-JS with Emotion**: All components use styled components via `@emotion/styled`
- **Theme Constants**: Defined in `src/constants.js`
  - Primary color: `#4ccdd6` (cyan)
  - Secondary color: `#4078c0` (blue)
  - Breakpoints: 760px (tablet), 1020px, 1180px, 1340px (large desktop)
- **Typography.js**: Grand View theme with custom overrides in `src/config/typography.js`
  - Injected in `pages/_app.js` via `typography.injectStyles()`
- **Responsive Design**: Mobile-first with breakpoint-based media queries

## Key Patterns & Conventions

### Data Fetching

Next.js SSG with Contentful SDK:
- `getStaticProps`: Fetches data at build time (homepage and blog posts)
- `getStaticPaths`: Generates all blog post routes at build time
- Contentful SDK client in `lib/contentful.js`:
  - `getAllBlogPosts()`: Fetches all posts
  - `getBlogPostBySlug(slug)`: Fetches single post
  - `getAllAssets()`: Fetches assets for embedded images
  - Helper functions format data for easy consumption

### Interactive Features

1. **Animated Intro** (`src/components/home/intro.js`):
   - Easter egg: Clicking logo triggers "thug life glasses" animation
   - Tracked via Google Analytics

2. **Contact Form Animation** (`src/components/shared/contact.js`):
   - Auto-typing effect with random messages
   - Sound effects via `use-sound` hook
   - Smooth scroll to contact section

3. **Blog Post Likes** (`src/components/blog/likes.js`):
   - useReducer for complex state management
   - Debounced API calls to prevent excessive writes
   - Random color fill animation on each like

### Image Optimization

Next.js Image component (`next/image`) handles:
- Automatic image optimization and format selection (WebP/AVIF)
- Responsive images with automatic srcset generation
- Quality set to 100 in next.config.js
- Lazy loading by default (except priority images)
- Contentful CDN URLs configured in `next.config.js` remotePatterns
- Local static assets served from `/public` directory

## Infrastructure

- **Hosting**: Netlify (Next.js SSG mode, see netlify.toml for build config)
- **AWS Resources**: Managed via Terraform in `/terraform` directory
- **Deployment**: Automatic via Netlify on git push to main branch
- **Analytics**: Google Analytics via Next.js Script component in `_app.js`
- **Serverless Functions**: Netlify Functions (compatible with Next.js)

## SEO Optimization

SEO implemented via Next.js Head component:
- **Homepage**: Meta tags, Open Graph, Twitter Cards in `pages/index.js`
- **Blog Posts**: Dynamic meta tags per post in `pages/[slug].js`
- **Structured Data**: BlogPost rich snippets via `BlogPostRichSnippet` component
- **Canonical URLs**: Set for all pages
- **Sitemap**: Dynamically generated at `/sitemap.xml` via `pages/sitemap.xml.js`
  - Uses `getServerSideProps` to fetch all posts from Contentful
  - Updates automatically with new posts
