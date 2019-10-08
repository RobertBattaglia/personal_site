import React from "react"
import styled from "@emotion/styled"

import Skill from "./skill"

const Wrapper = styled("section")`
  display: flex;
  flex-wrap: wrap;
  justify-content: space-evenly;
  margin: -10rem 2rem 4rem 2rem;
`

const Skills = () => {
  return (
    <Wrapper>
      <Skill title="Front End" desc="These are my front end skills" />
      <Skill title="Back End" desc="These are my back end skills" />
      <Skill title="Tooling" desc="These are my tooling skills" />
    </Wrapper>
  )
}

export default Skills
