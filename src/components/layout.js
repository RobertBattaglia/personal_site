import React from "react"
import { Global, css } from "@emotion/core"
import styled from "@emotion/styled"

import Footer from "../components/footer"

const Container = styled("div")`
  display: flex;
  flex-direction: column;
  min-height: 100vh;
`

const Main = styled("article")`
  flex-grow: 1;
`

const globalStyles = css`
  *,
  *::after,
  *::before {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
  }
`

const Layout = ({ children }) => (
  <Container>
    <Global styles={globalStyles} />
    <Main>{children}</Main>
    <Footer />
  </Container>
)

export default Layout
