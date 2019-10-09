import React from "react"
import { graphql, useStaticQuery } from "gatsby"

import { css } from "@emotion/core"
import { theme } from "../constants"

const footerStyle = css`
  padding: 10rem 0 3rem 0;
  background-color: ${theme.primaryColor};
  font-size: 1.5rem;
  color: ${theme.primaryFontColor};
  text-align: center;
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
    <footer css={footerStyle}>
      <p>
        {`Created by ${
          data.site.siteMetadata.author
        } © ${new Date().getFullYear()}`}{" "}
        w/{" "}
        <a
          href="https://www.gatsbyjs.org/"
          target="_blank"
          rel="noopener noreferrer"
        >
          Gatsby
        </a>
      </p>
    </footer>
  )
}

export default Footer
