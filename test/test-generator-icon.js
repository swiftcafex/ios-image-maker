
import test from 'ava';

var IconGenerator = require("../func/generator-icon");
var path = require("path");
var fs = require("fs.extra");

test.before(async t => {

    var workingDirList = [

        path.join(__dirname, "_support/test-generator-icon/generateIconSetFolder"),
        path.join(__dirname, "_support/test-generator-icon/generateAppIconSetImage")

    ];

    var promiseList = [];

    workingDirList.forEach(function (item) {

       var promise = new Promise(function(resolve, reject){

           process.chdir(item);
           fs.removeSync("./output/Assets.xcassets/");
           resolve();

       });

       promiseList.push(promise);

    });

    await Promise.all(promiseList).then(function(){

    });

});

test('AssetGenerator.generateIconSetFolder',async t => {

    var workingDIR = path.join(__dirname, "_support/test-generator-icon/generateIconSetFolder");
    process.chdir(workingDIR);

    var generator = new IconGenerator();

    t.false(fs.existsSync("./output/Assets.xcassets/Icon.appiconset"));
    t.false(fs.existsSync("./output/Assets.xcassets/Icon.appiconset/Contents.json"));

    await generator.generateIconSetFolder("./output/Assets.xcassets", "Icon").then(function(){

        t.true(fs.existsSync("./output/Assets.xcassets/Icon.appiconset"));
        t.true(fs.existsSync("./output/Assets.xcassets/Icon.appiconset/Contents.json"));

    });

    t.pass();

});

test('AssetGenerator.generateAppIconSetImage',async t => {

    var workingDIR = path.join(__dirname, "_support/test-generator-icon/generateAppIconSetImage");
    process.chdir(workingDIR);

    var generator = new IconGenerator();

    t.false(fs.existsSync("./output/Assets.xcassets/Icon.appiconset"));
    t.false(fs.existsSync("./output/Assets.xcassets/Icon.appiconset/Contents.json"));

    await generator.generateIconSetFolder("./output/Assets.xcassets", "Icon").then(function(appsetFolder){

        t.true(fs.existsSync("./output/Assets.xcassets/Icon.appiconset"));
        t.true(fs.existsSync("./output/Assets.xcassets/Icon.appiconset/Contents.json"));

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