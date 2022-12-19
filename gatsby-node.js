const path = require("path-browserify");

exports.createPages = async ({ graphql, actions, reporter }) => {
  const { createPage } = actions;
  const posts = await graphql(
    `
      {
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
            createdAt
            updatedAt
            updatedAtFormatted: updatedAt(formatString: "MMM Do, YYYY • h:mma")
            contentful_id
          }
        }
      }
    `
  );

  const assets = await graphql(
    `
      {
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
      }
    `
  );

  if (posts.errors || assets.errors) {
    reporter.panicOnBuild("Error while running GraphQL query.");
    return;
  }

  posts.data.allContentfulBlogPost.nodes.forEach((node) => {
    createPage({
      path: node.slug,
      component: path.resolve("src/templates/blog.js"),
      context: {
        ...node,
        updated: node.updatedAt, // not being passed into context for some reason
        updatedFormatted: node.updatedAtFormatted, // not being passed into context for some reason
        posts: posts.data.allContentfulBlogPost.nodes,
        assets: assets.data,
      },
    });
  });
};
