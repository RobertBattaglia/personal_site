import React from "react"
import { graphql, useStaticQuery } from "gatsby"
import Img from "gatsby-image"
import styled from "@emotion/styled"

const HeaderStyled = styled("header")`
  padding-top: 2rem;
  display: flex;
  justify-content: space-between;
  align-items: center;
  background: #fff;
`

const ImgWrapper = styled(Img)`
  margin-left: 3rem;
  cursor: pointer;
`

const Button = styled("button")`
  margin-right: 3rem;
  padding: 0.5rem 1rem;
  border: 2px solid #4ccdd6;
  border-radius: 1rem;
  color: #4ccdd6;
  background-color: #fff;
  font-size: 1rem;
  -webkit-transition: all 0.2s ease-in-out;
  cursor: pointer;
  :hover {
    background-color: #4ccdd6;
    color: #fff;
  }
`

function Header() {
  const data = useStaticQuery(graphql`
    query {
      file(relativePath: { eq: "logo.png" }) {
        childImageSharp {
          fixed(width: 70) {
            ...GatsbyImageSharpFixed
          }
        }
      }
    }
  `)
  return (
    <HeaderStyled>
      <ImgWrapper fixed={data.file.childImageSharp.fixed} alt="Logo" />
      <Button>Contact</Button>
    </HeaderStyled>
  )
}

export default Header
