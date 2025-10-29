import { getAllBlogPosts } from '../lib/contentful';
import { siteMetadata } from '../lib/config';

function generateSiteMap(posts) {
  return `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
  <!-- Homepage -->
  <url>
    <loc>${siteMetadata.siteUrl}</loc>
    <changefreq>weekly</changefreq>
    <priority>1.0</priority>
  </url>
  <!-- Blog Posts -->
  ${posts
    .map((post) => {
      const slug = post.fields.slug;
      const updatedAt = post.sys.updatedAt;

      return `
  <url>
    <loc>${siteMetadata.siteUrl}/${slug}</loc>
    <lastmod>${updatedAt}</lastmod>
    <changefreq>monthly</changefreq>
    <priority>0.8</priority>
  </url>
      `;
    })
    .join('')}
</urlset>
  `;
}

export async function getServerSideProps({ res }) {
  const posts = await getAllBlogPosts();

  const sitemap = generateSiteMap(posts);

  res.setHeader('Content-Type', 'text/xml');
  res.write(sitemap);
  res.end();

  return {
    props: {},
  };
}

export default function SiteMap() {
  // getServerSideProps will handle the response
  return null;
}
