import test from 'ava';

let testutil = require("../testutil/testutil");

var Generator = require("../func/generator");
var path = require("path");
var fs = require("fs");

var workingDIR = path.join(__dirname, "test-support/test-generator");
process.chdir(workingDIR);

test.before("create working dir", t => {

    testutil.createAndChangeToWorkingDirectory("test-generator");
    let listFilePath = testutil.getSupportFilePath("listFiles");
    fs.copyFileSync(listFilePath, "./");

});

test.after.always("clean working dir", t => {

    testutil.cleanWorkingDirectory();

});

test('Generator.listFiles',async t => {

    let generator = new Generator();

    await generator.listFiles("./listFiles").then(function(files){

        t.is(files.length, 2);
        t.is(files[0], 'listFiles/cloud.jpg');
        t.is(files[1], 'listFiles/disk.jpg');

    });

    await generator.listFiles("./nonexistPath").then(function(err){

    }).catch(function(err){

        t.truthy(err);

    });

    t.pass();

});