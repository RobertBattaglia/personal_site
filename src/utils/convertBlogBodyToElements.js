import React from 'react'
import { PrismAsyncLight as SyntaxHighlighter } from 'react-syntax-highlighter';
import { base16AteliersulphurpoolLight } from 'react-syntax-highlighter/dist/esm/styles/prism';
import styled from "@emotion/styled"

import Post from 'components/shared/post'

const CodeLine = styled('span')`
  background-color: rgb(245, 247, 255);
  color: rgb(34, 162, 201);
  padding: 0 2px;
`

const basicNodeTypeToElementMap = new Map([
  ['document', React.Fragment],
  ['paragraph', 'p'],
  ['heading-1', 'h1'],
  ['heading-2', 'h2'],
  ['heading-3', 'h3'],
  ['heading-4', 'h4'],
  ['heading-5', 'h5'],
  ['heading-6', 'h6'],
  ['unordered-list', 'ul'],
  ['ordered-list', 'ol'],
  ['list-item', 'li'],
  ['blockquote', 'blockquote'],
])

const convertBlogBodyToElements = (raw, assets, posts) => {

  const parseNode = (node) => {
    const { nodeType, content, data, value, marks } = node

    let element = null
    const mappedContent = () => content && content.map(parseNode)

    if (basicNodeTypeToElementMap.has(nodeType)) {
      element = React.createElement(
        basicNodeTypeToElementMap.get(nodeType),
        {},
        mappedContent()
      )
    }

    else if (nodeType === 'hr') {
      element = <hr />
    }

    else if (nodeType === 'hyperlink') {
      element = <a href={data.uri}>{mappedContent()}</a>
    }

    else if (nodeType === 'embedded-asset-block') {
      const { target: { sys: { id } } } = data
      let src, description
      for (let asset of assets) {
        if (id === asset.node.contentful_id) {
          src = asset.node.file.url
          description = asset.node.description
          break
        }
      }

      element = (
        <img
          src={src}
          alt={description}
        />
      )
    }

    else if (nodeType === 'entry-hyperlink') {
      const { target: { sys: { id } } } = data
      let postData

      for (let post of posts) {
        if (id === post.contentful_id) {
          postData = { ...post }
          break
        }
      }

      element = (
        <Post data={postData} />
      )
    }

    else if (nodeType === 'text') {
      const parts = value.split('`')
      if (parts.length < 3) {
        element = value
      } else {
        const children = []
        for (let i = 0; i < parts.length; i++) {
          if (i % 2 === 0) {
            children.push(parts[i])
          } else {
            children.push(<CodeLine>{parts[i]}</CodeLine>)
          }
        }
        element = <React.Fragment>{children}</React.Fragment>
      }

      marks.forEach(({ type }) => {
        if (type === 'code') {
          const elementParts = element.split('\n')
          const recognizedLanguages = new Set([
            'javascript',
            'graphql',
            'python',
            'sql',
            'html',
            'css',
            'sass',
            'jsx',
            'json',
            'go',
            'typescript',
            'bash'
          ])

          const isLanguage = recognizedLanguages.has(elementParts[0])
          const language = isLanguage ? elementParts[0] : 'javascript'

          element = (
            <SyntaxHighlighter
              language={language}
              style={base16AteliersulphurpoolLight}
              showLineNumbers
              wrapLongLines
            >
              {isLanguage ? elementParts.slice(1).join('\n') : element}
            </SyntaxHighlighter>
          )
        }

        else if (type === 'bold') {
          element = <strong>{element}</strong>
        }

        else if (type === 'italic') {
          element = <em>{element}</em>
        }

        else if (type === 'underline') {
          element = <u>{element}</u>
        }
      })
    }

    return element
  }

  console.log(JSON.parse(raw))
  const result = parseNode(JSON.parse(raw))
  console.log(result)
  return result
}

export default convertBlogBodyToElements
