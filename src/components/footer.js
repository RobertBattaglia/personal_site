import React from "react"
import { graphql, useStaticQuery } from "gatsby"
import styled from "@emotion/styled"
import {
  FaGithub,
  FaTwitter,
  FaAngellist,
  FaInstagram,
  FaLinkedin,
} from "react-icons/fa"

import { theme } from "../constants"

const Wrapper = styled("footer")`
  padding: 10rem 0 3rem 0;
  background-color: ${theme.primaryColor};
  font-size: 1.5rem;
  color: ${theme.primaryFontColor};
  text-align: center;
`

const Icons = styled("div")`
  display: flex;
  justify-content: space-evenly;
  width: 320px;
  height: 30px;
  margin: 1rem auto;
`

const A = styled("a")`
  margin: 0;
  color: ${theme.primaryFontColor};
  :hover {
    color: ${theme.secondaryColor};
  }
`

const P = styled("p")`
  margin: 0;
`

const Footer = () => {
  const data = useStaticQuery(graphql`
    query {
      site {
        siteMetadata {
          author
        }
      }
    }
  `)
  return (
    <Wrapper>
      <Icons>
        <A
          href="https://twitter.com/r0bertoB"
          target="_blank"
          rel="noopener noreferrer"
          aria-label="Rob's Twitter"
          >
          <FaTwitter size={30} />
        </A>
        <A
          href="https://angel.co/robert-battaglia-1"
          target="_blank"
          rel="noopener noreferrer"
          aria-label="Rob's Angelist"
          >
          <FaAngellist size={30} />
        </A>
        <A
          href="https://github.com/RobertBattaglia"
          target="_blank"
          rel="noopener noreferrer"
          aria-label="Rob's Github"
          >
          <FaGithub size={30} />
        </A>
        <A
          href="https://www.instagram.com/r0bertob/"
          target="_blank"
          rel="noopener noreferrer"
          aria-label="Rob's Instagram"
          >
          <FaInstagram size={30} />
        </A>
        <A
          href="https://www.linkedin.com/in/robertbattaglia1/"
          target="_blank"
          rel="noopener noreferrer"
          aria-label="Rob's Linkedin"
        >
          <FaLinkedin size={30} />
        </A>
      </Icons>
      <P>
        {`Created by ${
          data.site.siteMetadata.author
        } © ${new Date().getFullYear()}`}{" "}
        w/ ❤️ &{" "}
        <a
          href="https://www.gatsbyjs.org/"
          target="_blank"
          rel="noopener noreferrer"
        >
          Gatsby
        </a>
      </P>
    </Wrapper>
  )
}

export default Footer
