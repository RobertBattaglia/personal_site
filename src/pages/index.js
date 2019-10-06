import React from "react"
import { graphql } from "gatsby"
import Img from "gatsby-image"

import Layout from "../components/layout"

function Index({ data }) {
  return (
    <Layout>
      <div>Hello world!</div>
      <Img
        fixed={data.file.childImageSharp.fixed}
        alt="Me Wearing Sweater Outside"
      />
    </Layout>
  )
}

export default Index

export const data = graphql`
  query {
    file(relativePath: { eq: "me.jpeg" }) {
      childImageSharp {
        fixed {
          ...GatsbyImageSharpFixed
        }
      }
    }
  }
`
