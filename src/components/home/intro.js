import React, { useState, useEffect } from "react";
import Image from "next/image";
import styled from "@emotion/styled";
import { css } from "@emotion/css";
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

  /* Container for absolute positioning of glasses */
  & > div {
    position: relative;
  }
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

function Intro({ showingGlasses }) {
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
  const glassesCss = css`
    position: absolute !important;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%) rotate(-5deg);
    animation-name: ${glassesAnimation};
    animation-duration: 2000ms;
    pointer-events: none;
  `;

  const updateImageBounding = () => {
    const position =
      document.querySelector("#intro-me")?.getBoundingClientRect() || {};
    setImageBounding(position);
  };

  useEffect(() => {
    updateImageBounding();
    window.addEventListener("resize", updateImageBounding);
    return () => {
      window.removeEventListener("resize", updateImageBounding);
    };
  }, [showingGlasses]);

  return (
    <Wrapper id="intro">
      <Title>Software Engineer</Title>
      <SubTitle>I solve problems with code</SubTitle>
      <div style={{ position: "relative", display: "inline-block" }}>
        <Image
          id="intro-me"
          src="/me.jpeg"
          alt="Rob Wearing a Sweater in a backyard, with a fence in the background"
          priority
          width={250}
          height={250}
          style={{
            borderRadius: "50%",
            objectFit: "cover",
          }}
        />
        {showingGlasses ? (
          <Image
            src="/thug-life-glasses.png"
            alt="thug life sunglasses"
            width={80}
            height={80}
            className={glassesCss}
          />
        ) : null}
      </div>
    </Wrapper>
  );
}

export default Intro;
