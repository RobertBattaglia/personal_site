import React from "react";

import Layout from "components/shared/layout";
import Intro from "components/home/intro";
import About from "components/home/about";
import PostList from "components/home/postList";
import { siteMetadata } from "../../gatsby-config";

export const Head = () => (
  <>
    <meta charSet="utf-8" />
    <meta name="title" content={siteMetadata.title} />
    <meta name="description" content={siteMetadata.description} />
    <meta name="author" content={siteMetadata.author} />
    <meta name="keywords" content={siteMetadata.keywords} />
    <meta name="image" property="og:image" content={siteMetadata.image} />

    {/* Twitter Stuff */}
    <meta name="twitter:card" content="summary" />
    <meta name="twitter:site" content={siteMetadata.twitterUsername} />
    <meta name="twitter:title" content={siteMetadata.title} />
    <meta name="twitter:description" content={siteMetadata.description} />
    <meta name="twitter:image" content={siteMetadata.image} />
    <title>{siteMetadata.title}</title>
  </>
);

function Index() {
  return (
    <Layout page="index">
      <Intro />
      <About />
      <PostList />
    </Layout>
  );
}

export default Index;
