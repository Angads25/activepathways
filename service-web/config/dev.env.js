'use strict'
const merge = require('webpack-merge')
const prodEnv = require('./prod.env')

module.exports = merge(prodEnv, {
  NODE_ENV: '"development"',
 // BASE_API_URL: '"https://activepathways.co"'
   BASE_API_URL: '"http://localhost:3000"'
   //BASE_API_URL: '"/"'
})
