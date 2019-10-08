import React from "react"
import styled from "@emotion/styled"

import App from "./app"

const Wrapper = styled("section")`
  text-align: center;
  background-color: #4078c0;
`

const H1 = styled("h1")`
  color: #fff;
  padding-top: 3rem;
`

const AppsWrapper = styled("div")`
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
`

const Apps = () => {
  const apps = [
    { src: "minesweeper.gif", title: "Minesweeper" },
    { src: "uru-shop.gif", title: "Uru-Shop" },
    { src: "triva.gif", title: "Triva" },
  ]
  return (
    <Wrapper>
      <H1>Applications</H1>
      <AppsWrapper>
        {apps.map(app => (
          <App app={app} />
        ))}
      </AppsWrapper>
    </Wrapper>
  )
}

export default Apps
