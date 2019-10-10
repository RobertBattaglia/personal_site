import React from "react"
import styled from "@emotion/styled"

import Skill from "./skill"
import SkillData from "../data/skills.json"

const Wrapper = styled("section")`
  display: flex;
  flex-wrap: wrap;
  justify-content: space-evenly;
  margin: -10rem 2rem 4rem 2rem;
`

const Skills = () => {
  return (
    <Wrapper>
      {SkillData.map(({ title, skills }) => (
        <Skill title={title} skills={skills} />
      ))}
    </Wrapper>
  )
}

export default Skills
