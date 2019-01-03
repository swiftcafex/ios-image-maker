'use strict';

import test from 'ava';

var initFunc = require("../func/command-init");

var path = require("path");
var fs = require("fs");
var rmdir = require("rmdir");

var workingDIR = path.join(__dirname, "test-support/test-init");
// process.chdir(workingDirectoryPath);


var defaultSourcePath = "./sourceImages";
var defaultAssetPath = "./sourceImages/assets";
var defaultIconPath = "./sourceImages/icon";
var configFile = "./image-config.json";

// test.before(async t => {
//
//     fs.unlinkSync(configFile);
//
//     var promise = new Promise(function(resolve){
//
//         rmdir(defaultSourcePath, function(){
//
//
//             resolve();
//
//         });
//
//     });
//
//     await promise.then(function(){
//
//     });
//
// });
//
// test('test init', t => {
//
//     t.false(fs.existsSync(configFile));
//     t.false(fs.existsSync(defaultAssetPath));
//     t.false(fs.existsSync(defaultIconPath));
//
//     initFunc(function(){
//
//         // default file should be created
//         t.true(fs.existsSync(configFile));
//         t.true(fs.existsSync(defaultAssetPath));
//         t.true(fs.existsSync(defaultIconPath));
//
//     });
//
//     t.pass();
//
// });

test("place holder", t => {

    t.pass();
});