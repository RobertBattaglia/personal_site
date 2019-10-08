import React from "react"
import { graphql, useStaticQuery } from "gatsby"
import Img from "gatsby-image"
import styled from "@emotion/styled"

const Wrapper = styled("section")`
  text-align: center;
  padding: 0 2rem;
`

const Title = styled("h1")`
  margin-bottom: 0.25rem;
`

const SubTitle = styled("h3")`
  margin: 0 0 2rem 0;
  font-weight: 300;
`

const ImgWrapper = styled(Img)`
  border-radius: 50%;
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
    <Wrapper>
      <Title>Full Stack Software Engineer</Title>
      <SubTitle>
        I write code to solve real problems, and I love what I do.
      </SubTitle>
      <ImgWrapper
        fixed={data.file.childImageSharp.fixed}
        alt="Me Wearing Sweater Outside"
      />
    </Wrapper>
  )
}

export default Intro
