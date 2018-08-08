'use strict'
const merge = require('webpack-merge')
const prodEnv = require('./prod.env')
console.log("2")
module.exports = merge(prodEnv, {
  NODE_ENV: '"development"'
})
