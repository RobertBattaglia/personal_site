import React from "react"
import styled from "@emotion/styled"

import { theme, mediaQueries } from "../../constants"
import CNBC_LOGO from "assets/images/svgs/cnbc-logo.svg"

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
  max-width: 300px;
  color: ${theme.primaryFontColor};
  line-height: 1.5;
  text-align: center;
  text-justify: auto;
  ${mediaQueries.tablet} {
    max-width: 700px;
  }
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
        I fell in love with programming instantly after printing "Hello World!"
        to the terminal for the first time. My curiosity rapidly expanded,
        as each new concept introduced new rabbit holes to explore.
      </P>
      <P>
        I graduated{" "}
        <a href="https://com-robertbattaglia.s3.amazonaws.com/Transcript.pdf">
          magna cum laude
        </a>{" "}
        from{" "}
        <a href="http://qu.edu">Quinnipiac University</a>{" "}
        with a B.S. in Computer Information Systems.
      </P>
      <Logo>
        <CNBC_LOGO />
      </Logo>
      <P>My current role is on the Web Engagement team at{" "}
        <a href="https://cnbc.com">CNBC</a>.
      </P>
    </Wrapper>
  )
}

export default About
