const path = require("path-browserify");

module.exports = {
  siteMetadata: {
    title: "Robert Battaglia | Software Engineer",
    description: "Robert Battaglia's Personal Website",
    author: "Robert Battaglia",
    keywords: "Robert,Battaglia,Software Engineer",
    image: "/ogimage.jpeg",
    twitterUsername: "@r0bertoB",
    domain: "robertbattaglia.com",
  },
  plugins: [
    "gatsby-plugin-sharp",
    "gatsby-plugin-image",
    "gatsby-transformer-sharp",
    "gatsby-plugin-emotion",
    {
      resolve: "gatsby-plugin-typography",
      options: {
        pathToConfigModule: path.join(__dirname, "src", "config", "typography"),
      },
    },
    `gatsby-plugin-twitter`,
    {
      resolve: "gatsby-plugin-google-gtag",
      options: {
        trackingIds: [process.env.GA_TRACKING_ID],
        gtagConfig: {
          anonymize_ip: false,
          cookie_expires: 0,
        },
        pluginConfig: {
          head: false,
          respectDNT: true,
        },
      },
    },
    {
      resolve: "gatsby-plugin-react-svg",
      options: {
        rule: {
          include: /\.svg$/,
        },
      },
    },
    {
      resolve: "gatsby-source-contentful",
      options: {
        spaceId: "3fe7xd8j9mna",
        accessToken: process.env.CONTENTFUL_KEY,
      },
    },
    {
      resolve: "gatsby-plugin-resolve-src",
      options: {
        srcPath: path.resolve(__dirname, "src"),
      },
    },
  ],
};
