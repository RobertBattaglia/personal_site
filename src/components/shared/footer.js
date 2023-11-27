import React from "react";
import { graphql, useStaticQuery } from "gatsby";
import styled from "@emotion/styled";
import { FaGithub, FaLinkedin, FaKeybase } from "react-icons/fa";
import { FaXTwitter } from "react-icons/fa6";

import { theme } from "../../constants";

const Wrapper = styled("footer")`
  padding: 10rem 0 3rem 0;
  background-color: ${theme.primaryColor};
  color: ${theme.primaryFontColor};
  font-size: max(14px, calc(8px + 1vw));
  text-align: center;
`;

const Icons = styled("div")`
  display: flex;
  justify-content: space-evenly;
  width: 320px;
  height: 30px;
  margin: 1rem auto;
`;

const A = styled("a")`
  margin: 0;
  color: ${theme.primaryFontColor} !important;
  :hover {
    color: ${theme.secondaryColor} !important;
  }
`;

const P = styled("p")`
  margin: 0;
`;

const Footer = () => {
  const data = useStaticQuery(graphql`
    query {
      site {
        siteMetadata {
          author
        }
      }
    }
  `);
  return (
    <Wrapper>
      <Icons>
        <A
          href="https://x.com/r0bertoB"
          target="_blank"
          rel="noopener noreferrer"
          aria-label="Rob's Twitter"
        >
          <FaXTwitter size={30} />
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
          href="https://www.linkedin.com/in/robertbattaglia1/"
          target="_blank"
          rel="noopener noreferrer"
          aria-label="Rob's Linkedin"
        >
          <FaLinkedin size={30} />
        </A>
        <A
          href="https://keybase.io/robertbattaglia/"
          target="_blank"
          rel="noopener noreferrer"
          aria-label="Rob's Keybase"
        >
          <FaKeybase size={30} />
        </A>
      </Icons>
      <P>
        {`${data.site.siteMetadata.author} © ${new Date().getFullYear()}`} w/ ❤️
        &{" "}
        <A
          href="https://www.gatsbyjs.org/"
          target="_blank"
          rel="noopener noreferrer"
        >
          Gatsby
        </A>
        {" | "}
        <A
          href="https://github.com/RobertBattaglia/personal_site"
          target="_blank"
          rel="noopener noreferrer"
        >
          src
        </A>
      </P>
    </Wrapper>
  );
};

export default Footer;
