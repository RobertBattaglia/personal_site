import React from "react"
import styled from "@emotion/styled"
import { FaCheckCircle } from "react-icons/fa"

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

const Ul = styled("ul")`
  margin: 0;
`

const Li = styled("li")`
  list-style: none;
  font-size: 1.25rem;
  vertical-align: baseline;
`

const Skill = ({ title, skills }) => {
  return (
    <Wrapper>
      <h3>{title}</h3>
      <Ul>
        {skills.map(skill => (
          <Li>
            <FaCheckCircle size={16} style={{ verticalAlign: "center" }} />{" "}
            {skill}
          </Li>
        ))}
      </Ul>
    </Wrapper>
  )
}

export default Skill
