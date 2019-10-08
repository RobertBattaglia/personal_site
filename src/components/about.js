import React from "react"
import styled from "@emotion/styled"

import Emoji from "./emoji"

import { theme } from "../constants"

const Wrapper = styled("section")`
  background-color: ${theme.primaryColor};
  text-align: center;
`

const H3 = styled("h3")`
  font-size: calc(20px + 1.5vw);
  padding: 2rem 0 1rem 0;
  color: ${theme.primaryFontColor};
`

const P = styled("p")`
  margin: 0 auto;
  max-width: 700px;
  color: ${theme.primaryFontColor};
  line-height: 1.5;
  text-align: justify;
  text-justify: auto;
  @media (max-width: 768px) {
    max-width: 300px;
  }
`

const Hobbies = styled(P)`
  margin-top: 1rem;
  text-align: center;
  font-style: italic;
`

const EmojiDiv = styled("div")`
  display: flex;
  flex-direction: row;
  justify-content: space-evenly;
  max-width: 300px;
  margin: 0 auto;
`

const About = () => {
  return (
    <Wrapper>
      <H3>Hi, I'm Rob...</H3>
      <P>
        I am a fullstack software engineer based in New York. I fell in love
        with programming instantly after printing "Hello World!" to the command
        prompt using Python. My curiosity rapidly expanded, as each new concept
        introduced brand new rabbit holes to explore.
      </P>
      <Hobbies>Hobbies of Mine</Hobbies>
      <EmojiDiv>
        <Emoji label="guitar" symbol="🎸" />
        <Emoji label="coding" symbol="💻" />
        <Emoji label="lifting" symbol="🏋" />
      </EmojiDiv>
    </Wrapper>
  )
}

export default About
