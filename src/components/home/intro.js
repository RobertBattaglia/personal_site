import React, { useState, useEffect } from "react";
import { graphql, useStaticQuery } from "gatsby";
import { GatsbyImage } from "gatsby-plugin-image";
import styled from "@emotion/styled";
import { keyframes } from "@emotion/react";
import { mediaQueries } from "../../constants";

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
`;
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
`;

const Wrapper = styled("section")`
  display: flex;
  flex-direction: column;
  align-items: center;
  position: relative;
  text-align: center;
  padding: 0 2rem;
`;

const Title = styled("h1")`
  margin-top: 3.375rem;
  margin-bottom: 0.25rem;
  letter-spacing: 0px;
  animation-name: ${moveInLeft};
  animation-duration: 1200ms;
  font-size: calc(12px + 2vw);
  ${mediaQueries.tablet} {
    margin-bottom: 0.75rem;
    letter-spacing: 8px;
  }
`;

const SubTitle = styled("h3")`
  margin: 0 0 2rem 0;
  animation-name: ${moveInRight};
  animation-duration: 1200ms;
  font-size: calc(9px + 1vw);
`;

const ImgWrapper = styled(GatsbyImage)`
  border-radius: 50%;
`;

function Intro({ showingGlasses }) {
  const data = useStaticQuery(graphql`
    {
      me: file(relativePath: { eq: "me.jpeg" }) {
        childImageSharp {
          gatsbyImageData(width: 250, layout: FIXED)
        }
      }
      glasses: file(relativePath: { eq: "thug-life-glasses.png" }) {
        childImageSharp {
          gatsbyImageData(width: 50, layout: FIXED)
        }
      }
    }
  `);

  const [imageBounding, setImageBounding] = useState({});

  const glassesAnimation = keyframes`
  0% {
    top: 0px;
    right: 0px;
    transform: rotate(0deg);
  }
  100% {
    top: ${imageBounding.top - 29}px;
    right: ${imageBounding.right - 140}px;
    transform: rotate(-725deg);
  }
`;
  const Glasses = styled(GatsbyImage)`
    position: absolute !important;
    top: ${imageBounding.top - 29}px;
    right: ${imageBounding.right - 140}px;
    transform: rotate(-5deg);
    animation-name: ${glassesAnimation};
    animation-duration: 2000ms;
  `;

  useEffect(() => {
    setImageBounding(
      document.querySelector(".intro-me").getBoundingClientRect()
    );
  }, [showingGlasses]);

  return (
    <Wrapper id="intro">
      <Title>Full Stack Software Engineer</Title>
      <SubTitle>I solve problems with code</SubTitle>
      <ImgWrapper
        className="intro-me"
        image={data.me.childImageSharp.gatsbyImageData}
        alt="Rob Wearing a Sweater in a backyard, with a fence in the background"
      />
      {showingGlasses && (
        <Glasses
          image={data.glasses.childImageSharp.gatsbyImageData}
          alt="thug life sunglasses"
        />
      )}
    </Wrapper>
  );
}

export default Intro;
