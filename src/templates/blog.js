import React from "react";
import { graphql } from "gatsby";
import { GatsbyImage, getImage } from "gatsby-plugin-image";

import styled from "@emotion/styled";

import Layout from "components/layout";
import BlogPostRichSnippet from "components/blog/BlogPostRichSnippet";
import ByLineAuthor from "components/blog/ByLineAuthor";
import Likes from "components/blog/likes";
import convertBlogBodyToElements from "utils/convertBlogBodyToElements";
import { siteMetadata } from "../../gatsby-config";

const Container = styled("article")`
  max-width: 900px;
  padding: 0 30px;
  margin: -40px auto;
`;

export const query = graphql`
  query ($slug: String) {
    contentfulBlogPost(slug: { eq: $slug }) {
      title
      author {
        name
        displayName
        image {
          localFile {
            childImageSharp {
              gatsbyImageData(height: 40, layout: FIXED)
            }
          }
        }
        url
        jobTitle
      }
      featuredImage {
        url
        localFile {
          childImageSharp {
            gatsbyImageData(placeholder: BLURRED, height: 550)
          }
        }
      }
      blogBody {
        raw
      }
      createdAt
      updatedAt
      updatedAtFormatted: updatedAt(formatString: "MMM Do, YYYY • h:mma")
    }
    allContentfulAsset {
      edges {
        node {
          localFile {
            childImageSharp {
              gatsbyImageData(placeholder: BLURRED)
            }
          }
          contentful_id
          description
        }
      }
    }
  }
`;

export const Head = ({ pageContext, data: { contentfulBlogPost } }) => (
  <>
    <meta charSet="utf-8" />
    <meta name="title" content={contentfulBlogPost.title} />
    <meta name="description" content={siteMetadata.description} />
    <meta name="author" content={siteMetadata.author} />
    <meta name="keywords" content={siteMetadata.keywords} />
    <meta
      name="image"
      property="og:image"
      content={contentfulBlogPost.featuredImage.url}
    />
    <meta name="dateCreated" content={contentfulBlogPost.createdAt} />
    <meta name="dateModified" content={contentfulBlogPost.updatedAt} />

    {/* Twitter Stuff */}
    <meta name="twitter:card" content="summary" />
    <meta name="twitter:site" content={siteMetadata.twitterUsername} />
    <meta name="twitter:title" content={contentfulBlogPost.title} />
    <meta name="twitter:description" content={siteMetadata.description} />
    <meta name="twitter:image" content={contentfulBlogPost.featuredImage.url} />

    <title>{contentfulBlogPost.title}</title>
    <BlogPostRichSnippet
      author={contentfulBlogPost.author}
      dateModified={contentfulBlogPost.updatedAt}
      datePublished={contentfulBlogPost.createdAt}
      headline={contentfulBlogPost.title}
      image={contentfulBlogPost.featuredImage.url}
    />
    <link
      rel="canonical"
      href={`https://${siteMetadata.domain}${pageContext.slug}`}
    />
  </>
);

function Blog({ pageContext, data }) {
  const { posts } = pageContext;

  const {
    contentfulBlogPost: {
      title,
      author,
      featuredImage,
      blogBody,
      updatedAtFormatted,
    },
    allContentfulAsset,
  } = data;

  const blogBodyElements = convertBlogBodyToElements(
    blogBody.raw,
    allContentfulAsset.edges,
    posts
  );

  return (
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
        <div style={{ textAlign: "center" }}>
          <GatsbyImage
            image={getImage(
              featuredImage.localFile.childImageSharp.gatsbyImageData
            )}
            alt={featuredImage.description}
            style={{ marginBottom: "20px" }}
            loading="eager"
          />
        </div>
        {blogBodyElements}
        <Likes />
      </Container>
    </Layout>
  );
}

export default Blog;
