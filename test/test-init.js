'use strict';

import test from 'ava';

var initFunc = require("../func/init.func");
var path = require("path");

var fs = require("fs");
var rmdir = require("rmdir");

var workingDIR = path.join(__dirname, "_support/test-init");
process.chdir(workingDIR);


var defaultSourcePath = "./sourceImages";
var defaultAssetPath = "./sourceImages/assets";
var defaultIconPath = "./sourceImages/icon";

test.before(async t => {

    var promise = new Promise(function(resolve, reject){

        rmdir(defaultSourcePath, function(){

            resolve();

        });

    });

    await promise.then(function(){

    });

});

test('test init', t => {

    t.false(fs.existsSync("./image-config.js"));
    t.false(fs.existsSync(defaultAssetPath));
    t.false(fs.existsSync(defaultIconPath));

    initFunc(function(){

        // default file should be created
        t.true(fs.existsSync("./image-config.js"));
        t.true(fs.existsSync(defaultAssetPath));
        t.true(fs.existsSync(defaultIconPath));

    });

    t.pass();

});
