module.exports = {
  siteMetadata: {
    title: "Robert Battaglia | Engineer",
    description:
      "Robert Battaglia's Personal Website, including skills, applications portfolio, contact form and social links",
    author: "Robert Battaglia",
    keywords: "Robert,Battaglia,Full,Stack,Engineer,Javascript,Python,Contact",
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
    "gatsby-plugin-react-helmet",
  ],
}
