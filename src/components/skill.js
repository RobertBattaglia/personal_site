import React from "react"
import styled from "@emotion/styled"

import { mediaQueries } from "../constants"

const Wrapper = styled("figure")`
  height: 500px;
  width: 30%;
  margin: 1rem 0 0;
  background-color: #fff;
  border: solid #e6ecf8 1px;
  border-radius: 1rem;
  text-align: center;
  box-shadow: 0 5px 5px 0 rgba(233, 240, 243, 0.5), 0 0 0 1px #e6ecf8;
  ${mediaQueries.small} {
    width: 90%;
  }
`

const Skill = props => {
  const { title, desc } = props
  return (
    <Wrapper>
      <h3>{title}</h3>
      <p>{desc}</p>
    </Wrapper>
  )
}

export default Skill
