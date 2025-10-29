import React from "react";
import styled from "@emotion/styled";

import Post from "components/shared/post";

const H2 = styled("h2")`
  text-align: center;
  font-size: 32px;
`;

const PostList = ({ posts }) => {
  const edges = posts.map((post) => ({ node: post }));

  return (
    <div>
      <H2>Blog Posts</H2>
      {edges && (
        <>
          {edges.map(({ node: data }, idx) => (
            <Post key={idx} data={data} />
          ))}
        </>
      )}
    </div>
  );
};

export default PostList;
