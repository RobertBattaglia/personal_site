import React from "react"
import { graphql, useStaticQuery } from "gatsby"
import Img from "gatsby-image"
import styled from "@emotion/styled"

const HeaderStyled = styled("header")`
  display: flex;
  justify-content: space-between;
  align-items: center;
  background: #dddddd;
`

const ImgWrapper = styled(Img)`
  margin: 0.5rem;
  cursor: pointer;
`

const Button = styled("button")`
  margin: 0.5rem;
  padding: 1rem;
  border: 2px solid black;
  border-radius: 1rem;
  box-shadow: 1rem black;
`

function Header() {
  const data = useStaticQuery(graphql`
    query {
      file(relativePath: { eq: "logo.png" }) {
        childImageSharp {
          fixed(width: 100) {
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
