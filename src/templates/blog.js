import React from "react";

import styled from "@emotion/styled";

import Layout from "components/layout";
import ByLineAuthor from "components/blog/ByLineAuthor";
import Likes from "components/blog/likes";
import FontFaces from "components/shared/fontFaces";
import convertBlogBodyToElements from "utils/convertBlogBodyToElements";
import { siteMetadata } from "../../gatsby-config";

const Container = styled("article")`
  max-width: 900px;
  padding: 0 30px;
  margin: -40px auto;
`;

export const Head = ({ pageContext }) => (
  <>
    <meta charSet="utf-8" />
    <meta name="title" content={pageContext.title} />
    <meta name="description" content={siteMetadata.description} />
    <meta name="author" content={siteMetadata.author} />
    <meta name="keywords" content={siteMetadata.keywords} />
    <meta
      name="image"
      property="og:image"
      content={pageContext.featuredImage.file.url}
    />
    <meta name="dateCreated" content={pageContext.createdAt} />
    <meta name="dateModified" content={pageContext.updated} />

    {/* Twitter Stuff */}
    <meta name="twitter:card" content="summary" />
    <meta name="twitter:site" content={siteMetadata.twitterUsername} />
    <meta name="twitter:title" content={pageContext.title} />
    <meta name="twitter:description" content={siteMetadata.description} />
    <meta name="twitter:image" content={pageContext.featuredImage.file.url} />
    <title>{pageContext.title}</title>
    <FontFaces />
  </>
);

function Blog({ pageContext }) {
  const {
    blogBody: { raw: blogBody },
    assets: {
      allContentfulAsset: { edges: assets },
    },
    posts,
    updatedFormatted,
  } = pageContext;

  const blogBodyElements = convertBlogBodyToElements(blogBody, assets, posts);

  return (
    <Layout>
      <Container>
        <h1 style={{ fontSize: "48px", marginTop: "3.375rem" }}>
          {pageContext.title}
        </h1>
        <div
          style={{
            display: "flex",
            flexWrap: "wrap",
            marginBottom: "20px",
          }}
        >
          <ByLineAuthor authorName={"Rob"} />
          <time
            style={{
              lineHeight: "40px",
              marginLeft: "10px",
              fontSize: "13px",
              fontWeight: "500",
              color: "#5b636e",
            }}
          >
            Last Updated {updatedFormatted} UTC
          </time>
        </div>
        <div style={{ textAlign: "center" }}>
          <img
            src={pageContext.featuredImage.file.url}
            alt={pageContext.featuredImage.description}
            style={{ maxHeight: "550px" }}
          />
        </div>
        {blogBodyElements}
        <Likes />
      </Container>
    </Layout>
  );
}

export default Blog;
