import React from "react"
import styled from "@emotion/styled"

import { mediaQueries } from "../constants"

const Wrapper = styled("div")`
  height: 500px;
  width: 30%;
  margin: 1rem 0 0;
  background-color: #fff;
  border: solid #e6ecf8 1px;
  border-radius: 1rem;
  text-align: center;
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
