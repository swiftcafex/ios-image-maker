
import test from 'ava';

var IconGenerator = require("../func/generator-icon");
var path = require("path");
var fs = require("fs.extra");
var supportCleaner = require("./_support/_support-cleaner");

function clean() {

    return supportCleaner.cleanSupportDir([
        {
            "cwd" : path.join(__dirname, "_support/test-generator-icon/generateIconSetFolder"),
            "dir" : "./output/Assets.xcassets/"
        },
        {
            "cwd" : path.join(__dirname, "_support/test-generator-icon/generateAppIconSetImage"),
            "dir" : "./output/Assets.xcassets/"
        },
        {
            "cwd" : path.join(__dirname, "_support/test-generator-icon/startGenerateIcons"),
            "dir" : "./output/Assets.xcassets/"
        }
    ]);
}

test.before(async t => {

    await clean().then(function(){ });

});

test.after(async t => {

    await clean().then(function(){ });

});


test('AssetGenerator.generateIconSetFolder',async t => {

    var workingDIR = path.join(__dirname, "_support/test-generator-icon/generateIconSetFolder");
    process.chdir(workingDIR);

    var generator = new IconGenerator();

    t.false(fs.existsSync("./output/Assets.xcassets/cloud.appiconset"));
    t.false(fs.existsSync("./output/Assets.xcassets/cloud.appiconset/Contents.json"));

    await generator.generateIconSetFolder("./output/Assets.xcassets", "cloud").then(function(){

        t.true(fs.existsSync("./output/Assets.xcassets/cloud.appiconset"));
        t.true(fs.existsSync("./output/Assets.xcassets/cloud.appiconset/Contents.json"));

    });

    t.pass();

});

test('AssetGenerator.generateAppIconSetImage',async t => {

    var workingDIR = path.join(__dirname, "_support/test-generator-icon/generateAppIconSetImage");
    process.chdir(workingDIR);

    var generator = new IconGenerator();

    t.false(fs.existsSync("./output/Assets.xcassets/cloud.appiconset"));
    t.false(fs.existsSync("./output/Assets.xcassets/cloud.appiconset/Contents.json"));

    await generator.generateIconSetFolder("./output/Assets.xcassets", "cloud").then(function(appsetFolder){

        t.true(fs.existsSync("./output/Assets.xcassets/cloud.appiconset"));
        t.true(fs.existsSync("./output/Assets.xcassets/cloud.appiconset/Contents.json"));

        generator.generateAppIconSetImage("./source/cloud.jpg", appsetFolder).then(function(){

            // t.true(fs.existsSync("./output/Assets.xcassets/Icon.appiconset"));
            // t.true(fs.existsSync("./output/Assets.xcassets/Icon.appiconset/Contents.json"));

        });

    });

    t.pass();

});


test('AssetGenerator.startGenerateIcons',async t => {

    var workingDIR = path.join(__dirname, "_support/test-generator-icon/startGenerateIcons");
    process.chdir(workingDIR);

    var generator = new IconGenerator();

    generator.startGenerateIcons("./source", "./output/Assets.xcassets").then(function(){

    });

    t.pass();

});