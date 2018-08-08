'use strict'
const merge = require('webpack-merge')
const devEnv = require('./dev.env')
console.log(4)
module.exports = merge(devEnv, {
  NODE_ENV: '"testing"'
})
