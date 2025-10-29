import React from "react";
import Head from "next/head";

import Layout from "../src/components/layout";
import Intro from "../src/components/home/intro";
import About from "../src/components/home/about";
import PostList from "../src/components/home/postList";
import { siteMetadata } from "../lib/config";
import { getAllBlogPosts, formatBlogPost } from "../lib/contentful";

export async function getStaticProps() {
  const posts = await getAllBlogPosts();
  const formattedPosts = posts.map(formatBlogPost).filter(Boolean);

  return {
    props: {
      posts: formattedPosts,
    },
    revalidate: 3600, // Revalidate every hour (ISR)
  };
}

function Index({ posts }) {
  return (
    <>
      <Head>
        <meta charSet="utf-8" />
        <meta name="title" content={siteMetadata.title} />
        <meta name="description" content={siteMetadata.description} />
        <meta name="author" content={siteMetadata.author} />
        <meta name="image" property="og:image" content={siteMetadata.image} />

        {/* Twitter Stuff */}
        <meta name="twitter:card" content="summary" />
        <meta name="twitter:site" content={siteMetadata.twitterUsername} />
        <meta name="twitter:title" content={siteMetadata.title} />
        <meta name="twitter:description" content={siteMetadata.description} />
        <meta name="twitter:image" content={siteMetadata.image} />
        <title>{siteMetadata.title}</title>
        <link rel="canonical" href={siteMetadata.siteUrl} />
      </Head>
      <Layout page="index">
        <Intro />
        <About />
        <PostList posts={posts} />
      </Layout>
    </>
  );
}

export default Index;
