import { createClient } from 'contentful';

const client = createClient({
  space: '3fe7xd8j9mna',
  accessToken: process.env.CONTENTFUL_KEY,
});

/**
 * Fetch all blog posts from Contentful
 * @returns {Promise<Array>} Array of blog post entries
 */
export async function getAllBlogPosts() {
  try {
    const response = await client.getEntries({
      content_type: 'blogPost',
      order: '-sys.createdAt', // Sort by creation date, newest first
      include: 2, // Include linked entries (author, images)
    });

    return response.items;
  } catch (error) {
    console.error('Error fetching blog posts:', error);
    return [];
  }
}

/**
 * Fetch a single blog post by slug
 * @param {string} slug - The blog post slug (without leading/trailing slashes)
 * @returns {Promise<Object|null>} Blog post entry or null
 */
export async function getBlogPostBySlug(slug) {
  try {
    // Contentful stores slugs with leading/trailing slashes
    // So we need to search with the slash format
    const slugWithSlashes = `/${slug}/`;

    const response = await client.getEntries({
      content_type: 'blogPost',
      'fields.slug': slugWithSlashes,
      include: 2, // Include linked entries (author, images)
      limit: 1,
    });

    if (response.items.length > 0) {
      return response.items[0];
    }

    return null;
  } catch (error) {
    console.error(`Error fetching blog post with slug "${slug}":`, error);
    return null;
  }
}

/**
 * Fetch all Contentful assets (for embedded images in blog posts)
 * @returns {Promise<Array>} Array of asset entries
 */
export async function getAllAssets() {
  try {
    const response = await client.getAssets({
      limit: 1000, // Fetch all assets
    });

    return response.items;
  } catch (error) {
    console.error('Error fetching assets:', error);
    return [];
  }
}

/**
 * Helper function to format blog post data for easier use
 * @param {Object} entry - Contentful blog post entry
 * @returns {Object} Formatted blog post data
 */
export function formatBlogPost(entry) {
  if (!entry || !entry.fields) return null;

  const { fields, sys } = entry;

  // Clean slug - remove leading/trailing slashes
  let slug = fields.slug || '';
  if (slug.startsWith('/')) slug = slug.slice(1);
  if (slug.endsWith('/')) slug = slug.slice(0, -1);

  return {
    title: fields.title || '',
    slug: slug,
    description: fields.descrip?.descrip || fields.descrip || '',
    blogBody: fields.blogBody ? JSON.stringify(fields.blogBody) : null,
    featuredImage: fields.featuredImage
      ? {
          url: `https:${fields.featuredImage.fields.file.url}`,
          description: fields.featuredImage.fields.description || '',
          width: fields.featuredImage.fields.file.details.image?.width,
          height: fields.featuredImage.fields.file.details.image?.height,
        }
      : null,
    author: fields.author
      ? {
          name: fields.author.fields.name || '',
          displayName: fields.author.fields.displayName || '',
          jobTitle: fields.author.fields.jobTitle || '',
          url: fields.author.fields.url || '',
          image: fields.author.fields.image
            ? {
                url: `https:${fields.author.fields.image.fields.file.url}`,
                width: fields.author.fields.image.fields.file.details.image?.width,
                height: fields.author.fields.image.fields.file.details.image?.height,
              }
            : null,
        }
      : null,
    createdAt: sys.createdAt,
    updatedAt: sys.updatedAt,
    contentful_id: sys.id,
  };
}

/**
 * Helper function to format asset data
 * @param {Object} asset - Contentful asset entry
 * @returns {Object} Formatted asset data
 */
export function formatAsset(asset) {
  if (!asset || !asset.fields) return null;

  const { fields, sys } = asset;

  return {
    contentful_id: sys.id,
    url: `https:${fields.file.url}`,
    description: fields.description || '',
    width: fields.file.details.image?.width,
    height: fields.file.details.image?.height,
    contentType: fields.file.contentType,
  };
}
