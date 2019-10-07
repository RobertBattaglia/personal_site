import React from "react"
import { graphql, useStaticQuery } from "gatsby"
import Img from "gatsby-image"
import styled from "@emotion/styled"

const ImgWrapper = styled(Img)`
  border-radius: 50%;
  left: 50%;
  transform: translateX(-50%);
`

const DivWrapper = styled("div")`
  position: relative;
  background: #033752;
`

function Intro() {
  const data = useStaticQuery(graphql`
    query {
      file(relativePath: { eq: "me.jpeg" }) {
        childImageSharp {
          fixed(width: 250) {
            ...GatsbyImageSharpFixed
          }
        }
      }
    }
  `)

  return (
    <DivWrapper>
      <h1>Hi, I'm Rob</h1>
      <h4>I am a full stack engineer based in New York</h4>
      <ImgWrapper
        fixed={data.file.childImageSharp.fixed}
        alt="Me Wearing Sweater Outside"
      />
    </DivWrapper>
  )
}

export default Intro
