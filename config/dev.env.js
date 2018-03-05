'use strict'
const merge = require('webpack-merge')
const prodEnv = require('./prod.env')

module.exports = merge(prodEnv, {
  NODE_ENV: '"development"',
  FIREBASE_API_KEY: '"AIzaSyAdtChdjMgN5U1qJobXvgJ_rIHBA_bqIro"',
  FIREBASE_AUTH_DOMAIN: '"devo-pratilipi.firebaseapp.com"',
  FIREBASE_DATABASE_URL: '"https://devo-pratilipi.firebaseio.com"',
  FIREBASE_PROJECT_ID: '"devo-pratilipi"',
  FIREBASE_STORAGE_BUCKET: '"devo-pratilipi.appspot.com"',
  LANGUAGE: `"${process.env.LANGUAGE || 'hi'}"`
})
