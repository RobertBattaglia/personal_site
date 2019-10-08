module.exports = {
  siteMetadata: {
    title: "Robert Battaglia | Engineer",
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
    "gatsby-plugin-emotion",
    {
      resolve: `gatsby-plugin-typography`,
      options: {
        pathToConfigModule: `src/utils/typography`,
      },
    },
  ],
}
