
import test from 'ava';

var Generator = require("../func/generator");
var path = require("path");

var workingDIR = path.join(__dirname, "_support/test-generator");
process.chdir(workingDIR);

test('Generator.listFiles',async t => {

    var generator = new Generator();

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