const path = require("path-browserify");
const constants = require("./src/constants.js");

const domain = "robertbattaglia.com";

module.exports = {
  siteMetadata: {
    title: "Robert Battaglia | Software Engineer",
    description: "Robert Battaglia's Personal Website",
    author: "Robert Battaglia",
    keywords: "Robert,Battaglia,Software Engineer",
    image: `https://${domain}/ogimage.jpeg`,
    twitterUsername: "@r0bertoB",
    domain,
  },
  plugins: [
    {
      resolve: "gatsby-plugin-sharp",
      options: {
        defaults: {
          formats: [`auto`, `webp`],
          placeholder: `none`,
          quality: 100,
          breakpoints: constants.breakpoints,
          backgroundColor: `transparent`,
        },
      },
    },
    "gatsby-plugin-image",
    "gatsby-transformer-sharp",
    "gatsby-plugin-emotion",
    {
      resolve: "gatsby-plugin-typography",
      options: {
        pathToConfigModule: path.join(__dirname, "src", "config", "typography"),
      },
    },
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
      resolve: `gatsby-source-s3`,
      options: {
        aws: {
          accessKeyId: process.env.NETLIFY_AWS_ACCESS_KEY_ID,
          secretAccessKey: process.env.NETLIFY_AWS_SECRET_ACCESS_KEY,
          region: process.env.REGION,
        },
        buckets: [process.env.S3_BUCKET],
        expiration: 120,
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
