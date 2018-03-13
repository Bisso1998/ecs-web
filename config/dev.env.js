'use strict'
const merge = require('webpack-merge')
const prodEnv = require('./prod.env')

module.exports = merge(prodEnv, {
  NODE_ENV: '"development"',
  FIREBASE_API_KEY: '"AIzaSyAAnK0-vDmY1UEcrRRbCzXgdpF2oQn-E0w"',
  FIREBASE_AUTH_DOMAIN: '"prod-pratilipi.firebaseapp.com"',
  FIREBASE_DATABASE_URL: '"https://prod-pratilipi.firebaseio.com"',
  FIREBASE_PROJECT_ID: '"prod-pratilipi"',
  FIREBASE_STORAGE_BUCKET: '"prod-pratilipi.appspot.com"',
  LANGUAGE: `"${process.env.LANGUAGE || 'hi'}"`,
  FACEBOOK_APP_ID: '368844269953501'
})
