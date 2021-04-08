const path = require('path')

exports.createPages = async ({ graphql, actions, reporter }) => {
  const { createPage } = actions
  const posts = await graphql(
    `{
      allContentfulBlogPost {
        nodes {
          blogBody {
            raw
          }
          featuredImage {
            description
            file {
              url
            }
            createdAt
          }
          slug
          title
          author {
            name
            url
            image {
              description
              file {
                url
              }
            }
          }
          createdAt(formatString: "YYYY-MM-DD HH:mm:SS")
          updatedAt(formatString: "YYYY-MM-DD HH:mm:SS")
          contentful_id
        }
      }
    }`
  )

  const assets = await graphql(
    `{
      allContentfulAsset {
        edges {
          node {
            contentful_id
            file {
              url
            }
            description
          }
        }
      }
    }`
  )

  if (posts.errors || assets.errors) {
    reporter.panicOnBuild('Error while running GraphQL query.')
    return
  }

  posts.data.allContentfulBlogPost.nodes.forEach((node) => {
    createPage({
      path: node.slug,
      component: path.resolve('src/templates/blog.js'),
      context: {
        ...node,
        posts: posts.data.allContentfulBlogPost.nodes,
        assets: assets.data,
      },
    })
  })
}
