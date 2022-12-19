import React from "react";
import { Link } from "gatsby";
import styled from "@emotion/styled";

const A = styled(Link)`
  display: flex;
  justify-content: start;
  align-items: center;
  height: 140px;
  border: 3px solid salmon;
  padding: 10px;
  margin: 5% 10%;
  list-style: none;
`;

const IMG = styled("img")`
  max-width: 150px;
  max-height: 100px;
  margin: 0 10px;
`;

const P = styled("p")`
  margin: 0 auto;
  text-align: center;
  font-size: max(16px, calc(6px + 1vw));
`;

const Post = ({ data }) => (
  <A to={data.slug}>
    <IMG
      src={data.featuredImage.file.url}
      alt={data.featuredImage.description}
    />
    <P>{data.title}</P>
  </A>
);

export default Post;
