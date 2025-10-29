import React from "react";
import Link from "next/link";
import Image from "next/image";
import styled from "@emotion/styled";
import { mediaQueries } from "../../constants";

import { theme } from "../../constants";

const A = styled("a")`
  display: flex;
  justify-content: start;
  align-items: center;
  height: 140px;
  border: 3px solid ${theme.secondaryColor};
  background-color: lightgrey;
  padding: 15px;
  margin: 1rem;
  list-style: none;
  gap: 10px;

  ${mediaQueries.tablet} {
    margin: 1rem 10rem;
  }

  :hover {
    border: 3px solid ${theme.primaryColor};
  }
`;

const P = styled("p")`
  margin: 0 auto;
  text-align: center;
  font-size: max(16px, calc(6px + 1vw));
`;

const Post = ({ data }) => {
  // Safety check - return null if data is missing or invalid
  if (!data || !data.slug || !data.featuredImage || !data.title) {
    return null;
  }

  // Remove leading slash from slug if it exists to avoid double slashes
  const slug = data.slug.startsWith('/') ? data.slug.slice(1) : data.slug;
  // Remove trailing slash if it exists
  const cleanSlug = slug.endsWith('/') ? slug.slice(0, -1) : slug;

  return (
    <A as={Link} href={`/${cleanSlug}`}>
      <Image
        src={data.featuredImage.url}
        alt={data.featuredImage.description || ''}
        width={100}
        height={100}
        loading="lazy"
        style={{ objectFit: 'cover' }}
      />
      <P>{data.title}</P>
    </A>
  );
};

export default Post;
