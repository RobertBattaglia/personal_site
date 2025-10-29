import React from "react";
import Head from "next/head";
import Image from "next/image";
import styled from "@emotion/styled";

import Layout from "../src/components/layout";
import BlogPostRichSnippet from "../src/components/blog/BlogPostRichSnippet";
import ByLineAuthor from "../src/components/blog/ByLineAuthor";
import Likes from "../src/components/blog/likes";
import convertBlogBodyToElements from "../src/utils/convertBlogBodyToElements";
import { siteMetadata } from "../lib/config";
import {
  getAllBlogPosts,
  getBlogPostBySlug,
  formatBlogPost,
  getAllAssets,
  formatAsset,
} from "../lib/contentful";

const Container = styled("article")`
  max-width: 900px;
  padding: 0 30px;
  margin: -40px auto;
`;

export async function getStaticPaths() {
  const posts = await getAllBlogPosts();

  console.log('===== getStaticPaths DEBUG =====');
  console.log('Total posts fetched:', posts.length);
  console.log('Raw slugs from Contentful:', posts.map(p => p.fields.slug));

  const paths = posts.map((post) => {
    // Clean the slug - remove leading/trailing slashes
    let slug = post.fields.slug || '';
    const originalSlug = slug;
    if (slug.startsWith('/')) slug = slug.slice(1);
    if (slug.endsWith('/')) slug = slug.slice(0, -1);

    console.log(`Slug cleaning: "${originalSlug}" -> "${slug}"`);

    return {
      params: { slug },
    };
  });

  console.log('Generated paths:', JSON.stringify(paths, null, 2));
  console.log('===== END DEBUG =====');

  return {
    paths,
    fallback: 'blocking', // Generate new pages on-demand
  };
}

export async function getStaticProps({ params }) {
  const { slug } = params;

  console.log('===== getStaticProps DEBUG =====');
  console.log('Requested slug:', slug);

  // Fetch the blog post
  const post = await getBlogPostBySlug(slug);

  console.log('Post found:', !!post);
  if (post) {
    console.log('Post title:', post.fields.title);
    console.log('Post slug from Contentful:', post.fields.slug);
  }
  console.log('===== END DEBUG =====');

  if (!post) {
    return {
      notFound: true,
    };
  }

  // Fetch all posts (for inter-post linking)
  const allPosts = await getAllBlogPosts();
  const formattedPosts = allPosts.map(formatBlogPost).filter(Boolean);

  // Fetch all assets (for embedded images)
  const assets = await getAllAssets();
  const formattedAssets = assets.map(formatAsset).filter(Boolean);

  // Format the blog post
  const formattedPost = formatBlogPost(post);

  // Format the date
  const updatedDate = new Date(formattedPost.updatedAt);
  const updatedAtFormatted = updatedDate.toLocaleString('en-US', {
    month: 'short',
    day: 'numeric',
    year: 'numeric',
    hour: 'numeric',
    minute: '2-digit',
    hour12: true,
  }).replace(',', '') + 'a';

  return {
    props: {
      post: formattedPost,
      posts: formattedPosts,
      assets: formattedAssets,
      updatedAtFormatted,
    },
    revalidate: 3600, // Revalidate every hour (ISR)
  };
}

function Blog({ post, posts, assets, updatedAtFormatted }) {
  const { title, author, featuredImage, blogBody } = post;

  const blogBodyElements = convertBlogBodyToElements(blogBody, assets, posts);

  return (
    <>
      <Head>
        <meta charSet="utf-8" />
        <meta name="title" content={title} />
        <meta name="description" content={post.description} />
        <meta name="author" content={author.name} />
        <meta name="image" property="og:image" content={featuredImage.url} />
        <meta name="dateCreated" content={post.createdAt} />
        <meta name="dateModified" content={post.updatedAt} />

        {/* Twitter Stuff */}
        <meta name="twitter:card" content="summary" />
        <meta name="twitter:site" content={siteMetadata.twitterUsername} />
        <meta name="twitter:title" content={title} />
        <meta name="twitter:description" content={post.description} />
        <meta name="twitter:image" content={featuredImage.url} />

        <title>{title}</title>
        <link rel="canonical" href={`${siteMetadata.siteUrl}/${post.slug}`} />
      </Head>
      <BlogPostRichSnippet
        author={author}
        dateModified={post.updatedAt}
        datePublished={post.createdAt}
        headline={title}
        image={featuredImage.url}
      />
      <Layout>
        <Container>
          <h1 style={{ fontSize: "48px", marginTop: "3.375rem" }}>{title}</h1>
          <div
            style={{
              display: "flex",
              flexWrap: "wrap",
              marginBottom: "20px",
            }}
          >
            <ByLineAuthor author={author} />
            <time
              style={{
                lineHeight: "40px",
                marginLeft: "10px",
                fontSize: "13px",
                fontWeight: "500",
                color: "#5b636e",
              }}
            >
              Last Updated {updatedAtFormatted} UTC
            </time>
          </div>
          <div style={{ textAlign: "center", display: "flex", justifyContent: "center", marginBottom: "20px" }}>
            <Image
              src={featuredImage.url}
              alt={featuredImage.description}
              width={featuredImage.width || 900}
              height={featuredImage.height || 550}
              style={{ maxWidth: "100%", height: "auto" }}
              priority
            />
          </div>
          {blogBodyElements}
          <Likes />
        </Container>
      </Layout>
    </>
  );
}

export default Blog;
