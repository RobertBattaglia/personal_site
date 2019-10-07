import React from "react"
import { graphql, useStaticQuery } from "gatsby"

import { css } from "@emotion/core"

const footerStyle = css`
  padding: 2rem 0;
  background-color: #0074d9;
  font-size: 1.5rem;
  color: #033752;
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
      <p>{`Created by ${
        data.site.siteMetadata.author
      } © ${new Date().getFullYear()}`}</p>
      <p>
        Created With{" "}
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
