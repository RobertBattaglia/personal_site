import React from "react";
import styled from "@emotion/styled";

import AppData from "assets/data/applications.json";
import App from "./app";

const Wrapper = styled("section")`
  text-align: center;
  background-color: #4078c0;
  padding-bottom: 4rem;
`;

const H2 = styled("h2")`
  font-size: 2rem;
  color: #fff;
  padding-top: 3rem;
`;

const AppsWrapper = styled("div")`
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
`;

const Apps = () => (
  <Wrapper>
    <H2>Applications</H2>
    <AppsWrapper>
      {AppData.map((app) => (
        <App app={app} key={app.title} />
      ))}
    </AppsWrapper>
  </Wrapper>
);

export default Apps;
