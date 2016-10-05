/* eslint-env node */
'use strict';

var fs = require('fs');

var lex = require('pug-lexer');
var parse = require('pug-parser');
var wrap = require('pug-runtime/wrap');
var generateCode = require('pug-code-gen');

var glob = require("glob");

// Generate a string of HTML from a pug file's content
var pugToHtml = function(pugSource) {
  var funcStr = generateCode(parse(lex(pugSource)), {
    compileDebug: false,
    pretty: false,
    inlineRuntimeFunctions: false,
    templateName: 'pugTpl'
  });

  var func = wrap(funcStr, 'pugTpl');
  return func();
};

var fixer = function(options) {
  glob(options.srcPath + "/**/*.pug", {}, function (err, files) {
    files.forEach(function(fileName) {
      var pugContent = pugToHtml(fs.readFileSync(fileName, { encoding: 'utf8' }));
      var fileContent = "export var tpl = \"" + pugContent.replace(/"/g,'\\"') + "\";";
      fs.writeFileSync(fileName + ".ts", fileContent);
    });
  });
};

module.exports = fixer;
