import React from "react"
import { Helmet } from "react-helmet"

import { siteMetadata } from "../../gatsby-config"
import Layout from "../components/layout"
import Intro from "../components/intro"
import About from "../components/about"
import Skills from "../components/skills"
import Apps from "../components/apps"
import Contact from "../components/contact"

function Index() {
  return (
    <Layout>
      <Helmet>
        <html lang="en" />
        <meta charSet="utf-8" />
        <meta name="title" content={siteMetadata.title} />
        <meta name="description" content={siteMetadata.description} />
        <meta name="author" content={siteMetadata.author} />
        <meta name="keywords" content={siteMetadata.keywords} />
        <meta name="image" property="og:image" content={siteMetadata.image} />

        {/* Twitter Stuff */}
        <meta name="twitter:creator" content={siteMetadata.twitterUsername} />
        <meta name="twitter:title" content={siteMetadata.title} />
        <meta name="twitter:card" content={siteMetadata.image} />
        <meta name="twitter:site" content={siteMetadata.twitterUsername} />
        <meta name="twitter:domain" content={siteMetadata.domain} />
        <meta name="twitter:description" content={siteMetadata.description} />
        <title>{siteMetadata.title}</title>
      </Helmet>
      <Intro />
      <About />
      <Skills />
      <Apps />
      <Contact />
    </Layout>
  )
}

export default Index
