import React from "react";
import styled from "@emotion/styled";
import { mediaQueries } from "../../../constants";
import Coin from "./coin";

const Container = styled("div")`
  width: 100px;
  position: relative;
  text-align: center;
  color: goldenrod;
  font-size: 24px;
  font-weight: bold;
  letter-spacing: 2px;
  ${mediaQueries.tablet} {
    width: 200px;
  }
`;

const Counter = ({ initialized, totalLikes, myLikes }) => {
  return (
    <Container>
      {totalLikes}
      {initialized &&
        Array(myLikes)
          .fill(null)
          .map((_, idx) => {
            return myLikes === 8 ? (
              <Coin red="true" key={idx} />
            ) : (
              <Coin key={idx} />
            );
          })}
    </Container>
  );
};

export default Counter;
