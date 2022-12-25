const path = require("path-browserify");

exports.createPages = async ({ graphql, actions, reporter }) => {
  const { createPage } = actions;
  const posts = await graphql(
    `
      query {
        allContentfulBlogPost {
          nodes {
            featuredImage {
              description
              file {
                url
              }
            }
            slug
            title
            contentful_id
          }
        }
      }
    `
  );

  if (posts.errors) {
    reporter.panicOnBuild("Error while running GraphQL query.");
    return;
  }

  posts.data.allContentfulBlogPost.nodes.forEach(({ slug }) => {
    createPage({
      path: slug,
      component: path.resolve("src/templates/blog.js"),
      context: {
        slug,
        posts: posts.data.allContentfulBlogPost.nodes,
      },
    });
  });
};
