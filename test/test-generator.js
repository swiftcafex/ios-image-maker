"use strict";
import test from 'ava';

let testutil = require("../testutil/testutil");

var Generator = require("../func/generator");
var path = require("path");
const fs = require("fs");
const fse = require('fs-extra');

test.before("create working dir", t => {

    testutil.createAndChangeToWorkingDirectory("test-generator");

    let listFilePath = testutil.getSupportFilePath("images-for-generator");
    console.log(listFilePath);
    console.log("cwd" + process.cwd());

    fse.copySync(listFilePath, "./images-for-generator");

});

test.after.always("clean working dir", t => {

    testutil.cleanWorkingDirectory();

});

test('Generator.listFiles',async t => {

    let generator = new Generator();

    await generator.listFiles("./images-for-generator").then(function(files){

        t.is(files.length, 2);
        t.is(files[0], 'images-for-generator/cloud.jpg');
        t.is(files[1], 'images-for-generator/disk.jpg');

    });

    await generator.listFiles("./nonexistPath").then(function(err){

    }).catch(function(err){

        t.truthy(err);

    });

    t.pass();

});