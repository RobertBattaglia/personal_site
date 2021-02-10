import React from 'react'
import styled from '@emotion/styled'

import SkillData from 'assets/data/skills.json'
import Skill from './skill'

const Wrapper = styled('section')`
  display: flex;
  flex-wrap: wrap;
  justify-content: space-evenly;
  margin: -10rem 2rem 4rem 2rem;
`

const Skills = () => (
  <Wrapper>
    {SkillData.map(({ title, skills }) => (
      <Skill title={title} skills={skills} key={title} />
    ))}
  </Wrapper>
)

export default Skills
