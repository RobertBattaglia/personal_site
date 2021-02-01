import React from "react"
import { Helmet } from "react-helmet"

import { siteMetadata } from "../../gatsby-config"

import Layout from "../components/layout"
import convertBlogBodyToElements from "../utils/convertBlogBodyToElements"

function Blog({ pageContext }) {
  const { 
    blogBody: { raw: blogBody },
    assets: { allContentfulAsset: { edges: assets } },
    posts
  } = pageContext

  console.log(pageContext)
  const blogBodyElements = convertBlogBodyToElements(blogBody, assets, posts)
  
  return (
    <Layout>
      <Helmet>
        <html lang="en" />
        <meta charSet="utf-8" />
        <meta name="title" content={pageContext.title} />
        <meta name="description" content={siteMetadata.description} />
        <meta name="author" content={siteMetadata.author} />
        <meta name="keywords" content={siteMetadata.keywords} />
        <meta name="image" property="og:image" content={siteMetadata.image} />

        {/* Twitter Stuff */}
        <meta name="twitter:card" content="summary" />
        <meta name="twitter:site" content={siteMetadata.twitterUsername} />
        <meta name="twitter:title" content={pageContext.title} />
        <meta name="twitter:description" content={siteMetadata.description} />
        <meta name="twitter:image" content={siteMetadata.image} />
        <title>{pageContext.title}</title>
      </Helmet>
      <div style={{margin: '5%'}}>
        <h1 style={{ fontSize: '48px', textAlign: 'center'}}>
          {pageContext.title}
        </h1>
        <img
          src={pageContext.featuredImage.file.url}
          alt={pageContext.featuredImage.description}
        />
        {blogBodyElements}
      </div>
    </Layout>
  )
}

export default Blog