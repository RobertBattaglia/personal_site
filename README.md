[![Netlify Status](https://api.netlify.com/api/v1/badges/1323094c-ef6c-430a-82fa-c8cee3f0552d/deploy-status)](https://app.netlify.com/sites/sharp-wing-56f6f2/deploys)

[My Personal Site](https://robertbattaglia.com)

Created using Gatsby. This means all of the content is generated at build time, and there is no active runtime. There are a few serverless functions to enable users to like each blog post.

| Service                              | Description                |
| ------------------------------------ | -------------------------- |
| [Netlify](https://netlify.com)       | Website Host               |
| [Contentful](https://contentful.com) | CMS                        |
| [AWS](https://aws.com)               | Static Assets & Blog Likes |

bare minimum env variables during dev:
`CONTENTFUL_KEY`

for Google Analytics:
`GA_TRACKING_ID`

for Netlify:
`DYNAMO_LIKES_TABLE`,
`NETLIFY_AWS_ACCESS_KEY_ID` &
`NETLIFY_AWS_SECRET_ACCESS_KEY`
