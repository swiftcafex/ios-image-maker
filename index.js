#!/usr/bin/env node
'use strict';

var pjson = require('./package.json');
var config = require("./config");

var program = require('commander');

program.version(pjson.version, "-v, --version")
	.usage("<command>\n\n Where <command> is one of: init, make")
    .command('init', 'Init the current directory to use the ios-image command.')
	.command('make', 'Make @3x,@2x and @1x images according image-config.json')
	.action(function(){
		
	})
	.parse(process.argv);

if(program.make) {

    console.log("test test test");

}

