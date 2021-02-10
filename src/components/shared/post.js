import React from 'react'
import styled from '@emotion/styled'

const A = styled('a')`
  display: flex;
  justify-content: space-evenly;
  align-items: center;
  height: 140px;
  border: 3px solid salmon;
  padding: 10px;
  margin: 5% 10%;
  list-style: none;
`

const IMG = styled('img')`
  max-width: 100px;
  max-height: 100px;
  margin: 0;
`

const P = styled('p')`
  margin: 0;
`

const Post = ({ data }) => (
  <A href={data.slug}>
    <IMG
      src={data.featuredImage.file.url}
      alt={data.featuredImage.description}
    />
    <P>{data.title}</P>
  </A>
)

export default Post
