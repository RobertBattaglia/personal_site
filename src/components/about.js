import React from "react"
import styled from "@emotion/styled"

import Emoji from "./emoji"

import { theme, mediaQueries } from "../constants"
import CNBC_LOGO from '../images/svgs/cnbc-logo.svg'

const Wrapper = styled("section")`
  background-color: ${theme.primaryColor};
  text-align: center;
  padding-bottom: 10rem;
`

const H3 = styled("h3")`
  font-size: calc(20px + 1.5vw);
  margin: 10px auto 0 auto;
  padding: 2rem 0 1rem 0;
  color: ${theme.primaryFontColor};
`

const P = styled("p")`
  margin: 0px auto 50px auto;
  max-width: 700px;
  color: ${theme.primaryFontColor};
  line-height: 1.5;
  text-align: justify;
  text-justify: auto;
  ${mediaQueries.small} {
    max-width: 300px;
  }
`

const Hobbies = styled(P)`
  margin: 1rem auto 0 auto;
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

const Logo = styled("div")`
  margin: 0 auto 18px auto;
  max-width: 200px;
`

const About = () => {
  return (
    <Wrapper>
      <H3>Hi, I'm Rob...</H3>
      <P>
        I fell in love
        with programming instantly after printing "Hello World!" to the command
        prompt for the first time. My curiosity rapidly expanded, as each new concept
        introduced brand new rabbit holes to explore.
      </P>
      <Logo>
        <CNBC_LOGO/>
      </Logo>
      <P>
        My current role is on the Web Engagement team at CNBC.
      </P>
      <Hobbies>
        Hobbies of Mine
        <EmojiDiv>
          <Emoji label="guitar" symbol="🎸" />
          <Emoji label="coding" symbol="💻" />
          <Emoji label="lifting" symbol="🏋" />
        </EmojiDiv>
      </Hobbies>
    </Wrapper>
  )
}

export default About
