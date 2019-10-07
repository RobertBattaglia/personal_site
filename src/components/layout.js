import React from "react"
import { Global, css } from "@emotion/core"
import styled from "@emotion/styled"

import Header from "../components/header"
import Footer from "../components/footer"

const Container = styled("div")`
  display: flex;
  flex-direction: column;
  min-height: 100vh;
`

const Main = styled("article")`
  flex-grow: 1;
  max-width: 750px;
  margin: 1.5rem auto;
  padding: 0.5rem 1rem;
`

const globalStyles = css`
  *,
  *::after,
  *::before {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
    font-size: 10px;
  }
`

const Layout = ({ children }) => (
  <Container>
    <Global styles={globalStyles} />
    <Header />
    <Main>{children}</Main>
    <Footer />
  </Container>
)

export default Layout
