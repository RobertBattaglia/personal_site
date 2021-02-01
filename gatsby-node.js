const path = require("path")

exports.createPages = async ({ graphql, actions, reporter }) => {
  const { createPage } = actions
  const result = await graphql(
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
          updatedAt
        }
      }
    }`
  )

  if (result.errors) {
    reporter.panicOnBuild("Error while running GraphQL query.")
    return
  }

  result.data.allContentfulBlogPost.nodes.forEach(node => {
    createPage({
      path: node.slug,
      component: path.resolve(`src/templates/blog.js`),
      context: {
        ...node
      },
    })
  })
}