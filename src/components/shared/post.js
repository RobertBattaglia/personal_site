import React from "react";
import { Link } from "gatsby";
import { GatsbyImage, getImage } from "gatsby-plugin-image";
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

const P = styled("p")`
  margin: 0 auto;
  text-align: center;
  font-size: max(16px, calc(6px + 1vw));
`;

const Post = ({ data }) => (
  <A to={data.slug}>
    <GatsbyImage
      image={getImage(data.featuredImage.gatsbyImageData)}
      imgStyle={{ margin: "0 10px" }}
      alt={data.featuredImage.description}
      loading="lazy"
    />
    <P>{data.title}</P>
  </A>
);

export default Post;
