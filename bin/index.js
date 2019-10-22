#!/usr/bin/env node

const program = require('commander');
const utils = require('../lib/index')
program
.version('0.02', '-v,--version')
.command('init <projectName> <appId>')
.action((projectName, appId) => {
  if (!projectName || !appId) {
    consol.error('projectName and appId can not be empty; wxx-cli init projectName appId')
    return
  }
  utils.init(process.cwd(), projectName, appId)
});
program.parse(process.argv)


