import React from "react";
import { Link } from "gatsby";
import { GatsbyImage, getImage } from "gatsby-plugin-image";
import styled from "@emotion/styled";

import { theme } from "../../constants";

const A = styled(Link)`
  display: flex;
  justify-content: start;
  align-items: center;
  height: 140px;
  border: 3px solid ${theme.secondaryColor};
  background-color: lightgrey;
  padding: 15px;
  margin: 5% 10%;
  list-style: none;
  gap: 10px;

  :hover {
    border: 3px solid ${theme.primaryColor};
  }
`;

const P = styled("p")`
  margin: 0 auto;
  text-align: center;
  font-size: max(16px, calc(6px + 1vw));
`;

const Post = ({ data }) => (
  <A to={data.slug}>
    <GatsbyImage
      image={getImage(
        data.featuredImage.localFile.childImageSharp.gatsbyImageData
      )}
      alt={data.featuredImage.description}
      loading="lazy"
    />
    <P>{data.title}</P>
  </A>
);

export default Post;
