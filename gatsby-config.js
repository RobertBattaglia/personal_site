module.exports = {
  siteMetadata: {
    title: "Robert Battaglia | Engineer",
    description:
      "Robert Battaglia's Personal Website, including skills, applications portfolio, contact form and social links",
    author: "Robert Battaglia",
    keywords: "Robert,Battaglia,Full,Stack,Engineer,Javascript,Python,Contact",
    image: "https://robertbattaglia.com/static/8824911be2e7e0df61b20a75a1601d72/32ee9/me.jpg",
    twitterUsername: "@r0bertoB",
    domain: "robertbattaglia.com"
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
    {
      resolve: `gatsby-plugin-google-analytics`,
      options: {
        trackingId: process.env.GA_TRACKING_ID,
      },
    },
    {
      resolve: "gatsby-plugin-react-svg",
      options: {
        rule: {
          include: /\.svg$/
        }
      }
    },
  ],
}
