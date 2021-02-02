import React, { useState, useEffect } from "react"
import { graphql, useStaticQuery } from "gatsby"
import Img from "gatsby-image"
import styled from "@emotion/styled"
import { keyframes } from "@emotion/core"
import { mediaQueries } from "../../constants"

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
  position: relative;
  text-align: center;
  padding: 0 2rem;
`

const Title = styled("h1")`
  margin-bottom: 0.75rem;
  letter-spacing: 8px;
  animation-name: ${moveInLeft};
  animation-duration: 1200ms;
  ${mediaQueries.small} {
    margin-bottom: 0.25rem;
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

function Intro({ showingGlasses }) {
  const data = useStaticQuery(graphql`
    query {
      me: file(relativePath: { eq: "me.jpeg" }) {
        childImageSharp {
          fixed(width: 250) {
            ...GatsbyImageSharpFixed
          }
        }
      }
      glasses: file(relativePath: { eq: "thug-life-glasses.png" }) {
        childImageSharp {
          fixed(width: 50) {
            ...GatsbyImageSharpFixed
          }
        }
      }
    }
  `)

  const [imageBounding, setImageBounding] = useState({})

  const glassesAnimation = keyframes`
  0% {
    top: 0px;
    right: 0px;
    transform: rotate(0deg);
  }
  100% {
    top: ${imageBounding.top - 95}px;
    right: ${imageBounding.right - 140}px;
    transform: rotate(-725deg);
  }
`
  const Glasses = styled(Img)`
    position: absolute !important;
    top: ${imageBounding.top - 95}px;
    right: ${imageBounding.right - 140}px;
    transform: rotate(-5deg);
    animation-name: ${glassesAnimation};
    animation-duration: 2000ms;
  `

  useEffect(() => {
    setImageBounding(
      document.querySelector(".intro-me").getBoundingClientRect()
    )
  }, [showingGlasses])

  return (
    <Wrapper id="intro">
      <Title>Full Stack Software Engineer</Title>
      <SubTitle>
        I solve problems with code
      </SubTitle>
      <ImgWrapper
        className="intro-me"
        fixed={data.me.childImageSharp.fixed}
        alt="Rob Wearing a Sweater in a backyard, with a fence in the background"
      />
      {showingGlasses && (
        <Glasses
          fixed={data.glasses.childImageSharp.fixed}
          alt="thug life sunglasses"
        />
      )}
    </Wrapper>
  )
}

export default Intro
