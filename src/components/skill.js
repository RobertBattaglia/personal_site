import React from "react"
import styled from "@emotion/styled"
import { FaCheckCircle } from "react-icons/fa"

import Emoji from "./emoji"

import { mediaQueries } from "../constants"

const Wrapper = styled("div")`
  height: 500px;
  width: 30%;
  margin: 1rem 0 0;
  padding: 1rem;
  position: relative;
  background-color: #fff;
  border: solid #e6ecf8 1px;
  border-radius: 1rem;
  text-align: center;

  ${mediaQueries.small} {
    width: 90%;
    height: initial;
    max-height: 500px;
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

const emojis = {
  Proficient: { label: "coding", symbol: "💻" },
  Experienced: { label: "lifting", symbol: "🏋" },
  Learning: { label: "guitar", symbol: "🎸" },
  styles: {
    fontSize: "3rem",
    position: "absolute",
    top: "-6.5%",
    transform: "translateX(-50%)",
  },
}

const Skill = ({ title, skills }) => {
  return (
    <Wrapper>
      <Emoji
        styles={emojis.styles}
        label={emojis[title].label}
        symbol={emojis[title].symbol}
      />
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
