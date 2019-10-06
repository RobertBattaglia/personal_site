import React from "react"
import { graphql } from "gatsby"
import Img from "gatsby-image"

import Footer from "../components/footer"

function Index({ data }) {
  return (
    <>
      <div>Hello world!</div>
      <Img
        fixed={data.file.childImageSharp.fixed}
        alt="Me Wearing Sweater Outside"
      />
      <Footer />
    </>
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
