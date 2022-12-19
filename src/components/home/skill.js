import React from "react";
import styled from "@emotion/styled";
import { FaCheckCircle } from "react-icons/fa";

import { mediaQueries } from "../../constants";

import Emoji from "./emoji";

const Wrapper = styled("div")`
  width: 90%;
  margin: 1rem 0 0;
  padding: 1rem;
  position: relative;
  background-color: #fff;
  border: solid #e6ecf8 1px;
  border-radius: 1rem;
  text-align: center;

  ${mediaQueries.tablet} {
    width: 30%;
  }
`;

const Title = styled("h3")`
  margin-top: 3.375rem;
`;

const Ul = styled("ul")`
  margin: 0;
`;

const Li = styled("li")`
  list-style: none;
  font-size: 1.25rem;
  vertical-align: baseline;
`;

const emojis = {
  Proficient: { label: "coding", symbol: "💻" },
  Experienced: { label: "lifting", symbol: "🏋" },
  Learning: { label: "guitar", symbol: "🎸" },
  styles: {
    fontSize: "3rem",
    position: "absolute",
    top: "0%",
    transform: "translateX(-50%)",
  },
};

const Skill = ({ title, skills }) => (
  <Wrapper>
    <Emoji
      styles={emojis.styles}
      label={emojis[title].label}
      symbol={emojis[title].symbol}
    />
    <Title>{title}</Title>
    <Ul>
      {skills.map((skill) => (
        <Li key={skill}>
          <FaCheckCircle size={16} style={{ verticalAlign: "center" }} />{" "}
          {skill}
        </Li>
      ))}
    </Ul>
  </Wrapper>
);

export default Skill;
