#!/usr/bin/env node
/* eslint-env node */
'use strict';

var program = require('commander');
var fixer = require('../lib/fixer.js');

program
  .version(
    'version    : ' + require("../package.json").version + '\n' +
    'pug version: ' + require('pug/package.json').version
  )
  .option('-s, --src-path [path]','path where .ts files are located', 'src')
  .parse(process.argv);

fixer({
  srcPath: program.srcPath
});
