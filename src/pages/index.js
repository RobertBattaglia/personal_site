import React from 'react'
import { Helmet } from 'react-helmet'

import Layout from 'components/shared/layout'
import Intro from 'components/home/intro'
import About from 'components/home/about'
import Skills from 'components/home/skills'
import PostList from 'components/home/postList'
import Apps from 'components/home/apps'
import Contact from 'components/shared/contact'
import { siteMetadata } from '../../gatsby-config'

function Index() {
  return (
    <Layout page="index">
      <Helmet>
        <html lang="en" />
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
      </Helmet>
      <Intro />
      <About />
      <Skills />
      <PostList />
      <Apps />
      <Contact />
    </Layout>
  )
}

export default Index
