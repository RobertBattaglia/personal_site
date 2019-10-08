import React from "react"
import styled from "@emotion/styled"

const A = styled("a")`
  text-decoration: none !important;
  cursor: default;
`

const AppCard = styled("article")`
  min-height: 420px;
  width: 320px;
  margin: 1rem;
  background-color: #e6ecf8;
  border: solid #e6ecf8 1px;
`
const ImgWrapper = styled("figure")`
  height: 210px;
  padding: 1rem;
  background-color: #fff;
`

const Img = styled("img")`
  height: 100%;
  width: 100%;
  object-fit: contain;
`

const Title = styled("h4")`
  margin: 1rem 0 0 0;
  font-size: calc(12px + 1vw);
`

const Description = styled("p")`
  margin: 0;
  padding: 1.5rem;
  line-height: 1;
  text-align: justify;
  text-justify: auto;
`

const App = props => {
  const { src, title, link, desc } = props.app

  return (
    <A href={link} target="_blank" rel="noopener noreferrer">
      <AppCard>
        <ImgWrapper>
          <Img src={require(`../images/applications/${src}`)} />
        </ImgWrapper>
        <Title>{title}</Title>
        <Description>{desc}</Description>
      </AppCard>
    </A>
  )
}

export default App
