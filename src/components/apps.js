import React from "react"
import styled from "@emotion/styled"

import App from "./app"
import AppData from "../data/applications.json"

const Wrapper = styled("section")`
  text-align: center;
  background-color: #4078c0;
  padding-bottom: 4rem;
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
  return (
    <Wrapper>
      <H1>Applications</H1>
      <AppsWrapper>
        {AppData.map(app => (
          <App app={app} key={app.title} />
        ))}
      </AppsWrapper>
    </Wrapper>
  )
}

export default Apps
