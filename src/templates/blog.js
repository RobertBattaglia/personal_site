import React from "react";
import { Link, graphql } from "gatsby";
import { GatsbyImage, getImage } from "gatsby-plugin-image";
import styled from "@emotion/styled";

import Likes from "components/blog/likes";
import Layout from "components/shared/layout";
import convertBlogBodyToElements from "utils/convertBlogBodyToElements";
import { siteMetadata } from "../../gatsby-config";

const Container = styled("article")`
  max-width: 900px;
  padding: 0 30px;
  margin: -40px auto;
`;

export const pageQuery = graphql`
  query {
    s3Object(Key: {eq: "blog:meCropped.jpeg"}) {
      localFile {
        childImageSharp {
          gatsbyImageData(layout: FIXED, height: 40)
        }
      }
    }
  }
`

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
    </>
);

function Blog({ pageContext, data }) {
  const {
    blogBody: { raw: blogBody },
    author,
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
          <GatsbyImage
            image={getImage(data.s3Object.localFile)}
            loading="eager"
            style={{
              borderRadius: "100%",
              margin: "0 10px"
            }}
            alt="Rob the Author"
          />
          <Link
            to={author.url}
            style={{
              lineHeight: "40px",
              fontWeight: "600",
            }}
          >
            {author.name}
          </Link>
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
