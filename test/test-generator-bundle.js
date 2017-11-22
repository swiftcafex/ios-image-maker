
import test from 'ava';

var BundleGenerator = require("../func/generator-bundle");
var path = require("path");
var fs = require("fs");
var supportCleaner = require("./_support/_support-cleaner");

function clean() {

    return supportCleaner.cleanSupportDir([
        {
            "cwd" : path.join(__dirname, "_support/test-generator-bundle/generateBundleImage"),
            "dir" : "./output/result.bundle/"
        },
        {
            "cwd" : path.join(__dirname, "_support/test-generator-bundle/startGenerateBundle"),
            "dir" : "./output/result.bundle/"
        }
    ]);

}

test.before(async t => {

    await clean().then(function(){ });

});

test.after(async t => {

    await clean().then(function(){ });

});

test('BundleGenerator.generateBundleImage',async t => {

    var workingDIR = path.join(__dirname, "_support/test-generator-bundle/generateBundleImage");
    process.chdir(workingDIR);

    var generator = new BundleGenerator();

    t.false(fs.existsSync("./output/result.bundle"));
    t.false(fs.existsSync("./output/result.bundle/cloud.jpg"));
    t.false(fs.existsSync("./output/result.bundle/cloud@2x.jpg"));
    t.false(fs.existsSync("./output/result.bundle/cloud@3x.jpg"));

    // non-exist source should fail.
    await generator.generateBundleImage("./source/cloud-nonexists.jpg", "./output/result.bundle").then(function(){

        t.fail();

    }).catch(function(err){

        t.false(fs.existsSync("./output/result.bundle"));
        t.false(fs.existsSync("./output/result.bundle/cloud.jpg"));
        t.false(fs.existsSync("./output/result.bundle/cloud@2x.jpg"));
        t.false(fs.existsSync("./output/result.bundle/cloud@3x.jpg"));

    });

    // success generate
    await generator.generateBundleImage("./source/cloud.jpg", "./output/result.bundle").then(function(){

        t.true(fs.existsSync("./output/result.bundle"));
        t.true(fs.existsSync("./output/result.bundle/cloud.jpg"));
        t.true(fs.existsSync("./output/result.bundle/cloud@2x.jpg"));
        t.true(fs.existsSync("./output/result.bundle/cloud@3x.jpg"));

    });



    t.pass();

});

test('BundleGenerator.startGenerateBundle', async t => {

    var workingDIR = path.join(__dirname, "_support/test-generator-bundle/startGenerateBundle");
    process.chdir(workingDIR);

    var generator = new BundleGenerator();

    t.false(fs.existsSync("./output/result.bundle"));
    t.false(fs.existsSync("./output/result.bundle/cloud.jpg"));
    t.false(fs.existsSync("./output/result.bundle/cloud@2x.jpg"));
    t.false(fs.existsSync("./output/result.bundle/cloud@3x.jpg"));

    t.false(fs.existsSync("./output/result.bundle/tree.png"));
    t.false(fs.existsSync("./output/result.bundle/tree@2x.png"));
    t.false(fs.existsSync("./output/result.bundle/tree@3x.png"));

    await generator.startGenerateBundle("./source", "./output/result.bundle").then(function(){

        t.true(fs.existsSync("./output/result.bundle"));
        t.true(fs.existsSync("./output/result.bundle/cloud.jpg"));
        t.true(fs.existsSync("./output/result.bundle/cloud@2x.jpg"));
        t.true(fs.existsSync("./output/result.bundle/cloud@3x.jpg"));

        t.true(fs.existsSync("./output/result.bundle/tree.png"));
        t.true(fs.existsSync("./output/result.bundle/tree@2x.png"));
        t.true(fs.existsSync("./output/result.bundle/tree@3x.png"));

    });

    t.pass();

});