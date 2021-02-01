import React from 'react'
import { PrismAsyncLight as SyntaxHighlighter } from 'react-syntax-highlighter';
import { base16AteliersulphurpoolLight } from 'react-syntax-highlighter/dist/esm/styles/prism';

import Post from '../components/post'

const convertBlogBodyToElements = (raw, assets, posts) => {
  const recognizedNodeTypes = new Set([
    'document',
    'paragraph',
    'heading-1',
    'heading-2',
    'heading-3',
    'heading-4',
    'heading-5',
    'heading-6',
    'unordered-list',
    'ordered-list',
    'list-item',
    'blockquote',
    'hr',
    'hyperlink',
    'embedded-asset-block',
    'entry-hyperlink',
    'text',
  ])
  
  const parseNode = (node) => {
    const { nodeType, content, data, value, marks } = node

    if (!recognizedNodeTypes.has(nodeType)) {
      return null
    }

    const mappedContent = () => content && content.map(parseNode) 
    let element
    
    if (nodeType === 'document') {
      element = <React.Fragment>{mappedContent()}</React.Fragment>
    }

    else if (nodeType === 'paragraph') {
      element = <p>{mappedContent()}</p>
    }

    else if (nodeType === 'heading-1') {
      element = <h1>{mappedContent()}</h1>
    }

    else if (nodeType === 'heading-2') {
      element = <h2>{mappedContent()}</h2>
    }

    else if (nodeType === 'heading-3') {
      element = <h3>{mappedContent()}</h3>
    }

    else if (nodeType === 'heading-4') {
      element = <h4>{mappedContent()}</h4>
    }
    
    else if (nodeType === 'heading-5') {
      element = <h5>{mappedContent()}</h5>
    }

    else if (nodeType === 'heading-6') {
      element = <h6>{mappedContent()}</h6>
    }

    else if (nodeType === 'unordered-list') {
      element = <ul>{mappedContent()}</ul>
    }

    else if (nodeType === 'ordered-list') {
      element = <ol>{mappedContent()}</ol>
    }

    else if (nodeType === 'list-item') {
      element = <li>{mappedContent()}</li>
    }
    
    else if (nodeType === 'blockquote') {
      element = <blockquote>{mappedContent()}</blockquote>
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
          postData = {...post}
        }
      }

      element = (
        <Post data={postData} />
      )
    }

    else if (nodeType === 'text') {
      element = value
      marks.forEach(({ type }) => {
        if (type === 'code') {
          element = (
            <SyntaxHighlighter 
              language="javascript"
              style={base16AteliersulphurpoolLight}
              showLineNumbers
              wrapLongLines

            >
              {element}
            </SyntaxHighlighter>
          )
        }
        if (type === 'bold') {
          element = <strong>{element}</strong>
        }
        
        if (type === 'italic') {
          element = <em>{element}</em>
        }
          
        if (type === 'underline') {
          element = <u>{element}</u>
        }
      })
    }

    return element
  }
  
  return parseNode(JSON.parse(raw))
}

export default convertBlogBodyToElements
