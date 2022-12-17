import React from 'react'
import styled from '@emotion/styled'
import Logo from 'assets/images/svgs/indeed-logo.svg'
import { theme, mediaQueries } from '../../constants'

const Wrapper = styled('section')`
  background-color: ${theme.primaryColor};
  text-align: center;
  padding-bottom: 10rem;
`

const H3 = styled('h3')`
  font-size: calc(20px + 1.5vw);
  margin: 10px auto 0 auto;
  padding: 2rem 0 1rem 0;
  color: ${theme.primaryFontColor};
`

const P = styled('p')`
  margin: 0px auto 50px auto;
  max-width: 300px;
  color: ${theme.primaryFontColor};
  line-height: 1.5;
  text-align: center;
  text-justify: auto;
  font-size: max(16px, calc(8px + 1vw));
  ${mediaQueries.tablet} {
    max-width: 700px;
  }
`

const IndeedLogo = styled(Logo)`
  margin: 0 auto 18px auto;
  transform: scale(2.5);
`

const About = () => (
  <Wrapper>
    <H3>Hi, I'm Rob...</H3>
    <P>
      I fell in love with programming instantly after printing "Hello World!"
      to the terminal for the first time. My curiosity rapidly expanded,
      as each new concept introduced new rabbit holes to explore.
    </P>
    <P>
      I graduated
      {' '}
      <a href="https://com-robertbattaglia-20221219011754440600000001.s3.amazonaws.com/Transcript.pdf">
        magna cum laude
      </a>
      {' '}
      from
      {' '}
      <a href="http://qu.edu">Quinnipiac University</a>
      {' '}
      with a B.S. in Computer Information Systems.
    </P>
    <IndeedLogo />
    <P>
      I am currently a software engineer on the Job Search Growth team at <a href="https://www.indeed.com">Indeed</a>.
    </P>
  </Wrapper>
)

export default About
