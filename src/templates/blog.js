import React from "react"
import { PrismAsyncLight as SyntaxHighlighter } from 'react-syntax-highlighter';
import { base16AteliersulphurpoolLight } from 'react-syntax-highlighter/dist/esm/styles/prism';
import { Helmet } from "react-helmet"
import { siteMetadata } from "../../gatsby-config"

import Layout from "../components/layout"

const convertRawBlogBodyToRootElements = ({ blogBody: { raw } }) => {
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
    'text',
  ])
  
  const parseNode = (node) => {
    const { nodeType, content, value, marks } = node

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
  
  const result = parseNode(JSON.parse(raw))
  console.log(JSON.parse(raw))
  console.log(result)
  return result
}

function Blog({ pageContext }) {
  const blogBodyElements = convertRawBlogBodyToRootElements(pageContext)
  
  return (
    <Layout>
      <Helmet>
        <html lang="en" />
        <meta charSet="utf-8" />
        <meta name="title" content={siteMetadata.title} />
        <meta name="description" content={siteMetadata.description} />
        <meta name="author" content={siteMetadata.author} />
        <meta name="keywords" content={siteMetadata.keywords} />
        <meta name="image" property="og:image" content={siteMetadata.image} />

        {/* Twitter Stuff */}
        <meta name="twitter:card" content="summary" />
        <meta name="twitter:site" content={siteMetadata.twitterUsername} />
        <meta name="twitter:title" content={siteMetadata.title} />
        <meta name="twitter:description" content={siteMetadata.description} />
        <meta name="twitter:image" content={siteMetadata.image} />
        <title>{siteMetadata.title}</title>
      </Helmet>
      <div style={{margin: '5%'}}>
        <h2>
          {pageContext.title}
        </h2>
        {blogBodyElements}
      </div>
    </Layout>
  )
}

export default Blog