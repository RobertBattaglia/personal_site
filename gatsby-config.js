module.exports = {
  siteMetadata: {
    title: "Robert Battaglia",
    author: "Robert Battaglia",
  },
  plugins: [
    {
      resolve: "gatsby-source-filesystem",
      options: {
        name: "Images",
        path: `${__dirname}/src/images/`,
      },
    },
    "gatsby-plugin-sharp",
    "gatsby-transformer-sharp",
  ],
}
