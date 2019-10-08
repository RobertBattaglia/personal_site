import React from "react"
import styled from "@emotion/styled"

const AppCard = styled("figure")`
  height: 420px;
  width: 320px;
  margin: 1rem;
  background-color: #e6ecf8;
  border: solid #e6ecf8 1px;
`

const App = props => {
  const { src, title } = props.app

  return (
    <AppCard>
      <img src={require(`../images/applications/${src}`)} />
      <p>{title}</p>
    </AppCard>
  )
}

export default App
