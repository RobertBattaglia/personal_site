import React from "react"
import { graphql, useStaticQuery } from "gatsby"
import styled from "@emotion/styled"

const H2 = styled("H2")`
  text-align: center;
`;

const A = styled("a")`
  display: flex;
  justify-content: space-evenly;
  align-items: center;
  height: 140px;
  border: 3px solid salmon;
  padding: 10px;
  margin: 5% 10%;
  list-style: none;
`

const IMG = styled("img")`
  max-width: 100px;
  max-height: 100px;
  margin: 0;
`

const P = styled("p")`
  margin: 0;
`

const BlogList = () => {
  const data = useStaticQuery(graphql`
  query {
    allContentfulBlogPost {
      edges {
        node {
          title
          slug
          featuredImage {
            description
            file {
              url
            }
          }
        }
      }
    }
  }
  `)

  const { allContentfulBlogPost: { edges } } = data

  return (
    <div>
      <H2>Posts</H2>
      {edges && (
        <>
        {edges.reverse().map(({node: post}) => (
            <A href={post.slug}>
              <IMG 
                src={post.featuredImage.file.url} 
                alt={post.featuredImage.description}
              />
              <P>{post.title}</P>
            </A>
        ))}
        </>
      )}
    </div>
  )
}

export default BlogList
