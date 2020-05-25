const contentful = require('contentful')

module.exports = contentful.createClient({
  host: process.env.CONTENTFUL_HOST,
  space: process.env.CONTENTFUL_SPACE_ID,
  environment: process.env.CONTENTFUL_ENVIRONMENT_ID,
  accessToken: process.env.CONTENTFUL_DELIVERY_ACCESS_TOKEN
})
