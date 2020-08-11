import React from "react"
import { graphql, useStaticQuery } from "gatsby"
import Img from "gatsby-image"
import styled from "@emotion/styled"
import { keyframes } from "@emotion/core"
import { mediaQueries } from "../constants"

const moveInLeft = keyframes`
  0% {
    opacity: 0;
    transform: translateX(-100px);
  }
  80% {
    transform: translateX(20px);
  }
  100% {
    opacity: 1;
    transform: translate(0);
  }
`
const moveInRight = keyframes`
  0% {
    opacity: 0;
    transform: translateX(60px);
  }
  80% {
    transform: translateX(-16px);
  }
  100% {
    opacity: 1;
    transform: translate(0);
  }
`

const Wrapper = styled("section")`
  text-align: center;
  padding: 0 2rem;
`

const Title = styled("h1")`
  margin-bottom: 0.75rem;
  letter-spacing: 8px;
  animation-name: ${moveInLeft};
  animation-duration: 1200ms;
  ${mediaQueries.small} {
    letter-spacing: 0px;
  }
`

const SubTitle = styled("h3")`
  margin: 0 0 2rem 0;
  animation-name: ${moveInRight};
  animation-duration: 1200ms;
  font-size: calc(9px + 1vw);
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
        I solve problems with code and I wouldn't change a thing.
      </SubTitle>
      <ImgWrapper
        fixed={data.file.childImageSharp.fixed}
        alt="Rob Wearing a Sweater in a backyard, with a fence in the background"
      />
    </Wrapper>
  )
}

export default Intro
