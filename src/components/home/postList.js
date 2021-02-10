import React from 'react'
import { graphql, useStaticQuery } from 'gatsby'
import styled from '@emotion/styled'

import Post from 'components/shared/post'

const H2 = styled('h2')`
  text-align: center;
  font-size: 32px;
`

const PostList = () => {
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
          {edges.reverse().map(({ node: data }, idx) => (
            <Post key={idx} data={data} />
          ))}
        </>
      )}
    </div>
  )
}

export default PostList
