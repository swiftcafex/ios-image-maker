
import test from 'ava';

let testutil = require("../testutil/testutil");

var IconGenerator = require("../func/generator-icon");
var path = require("path");
var fs = require("fs");
var fse = require("fs-extra");

var iconTemplate = require("../func/app-icon-template");


// var supportCleaner = require("./test-support/_support-cleaner");
//
// function clean() {
//
//     return supportCleaner.cleanSupportDir([
//         {
//             "cwd" : path.join(__dirname, "test-support/test-generator-icon/generateIconSetFolder"),
//             "dir" : "./output/Assets.xcassets/"
//         },
//         {
//             "cwd" : path.join(__dirname, "test-support/test-generator-icon/generateAppIconSetImage"),
//             "dir" : "./output/Assets.xcassets/"
//         },
//         {
//             "cwd" : path.join(__dirname, "test-support/test-generator-icon/startGenerateIcons"),
//             "dir" : "./output/Assets.xcassets/"
//         }
//     ]);
// }
//
// test.before(async t => {
//
//     await clean().then(function(){ });
//
// });
//
// test.after(async t => {
//
//     await clean().then(function(){ });
//
// });


test.before("create working dir", t => {

    testutil.createAndChangeToWorkingDirectory("test-generator-icon");

});

test.after.always("clean working dir", t => {

    testutil.cleanWorkingDirectory();

});


test.serial('generate icon asset folder',async t => {

    testutil.createAndChangeToSubDirectory("generateIconSetFolder");

    var generator = new IconGenerator();

    t.false(fs.existsSync("./output/Assets.xcassets/cloud.appiconset"));
    t.false(fs.existsSync("./output/Assets.xcassets/cloud.appiconset/Contents.json"));

    await generator.generateIconSetFolder("./output/Assets.xcassets", "cloud").then(function(){

        t.true(fs.existsSync("./output/Assets.xcassets/cloud.appiconset"));
        t.true(fs.existsSync("./output/Assets.xcassets/cloud.appiconset/Contents.json"));

    });

});

test.serial('generate icon asset image',async t => {

    t.plan(5 + iconTemplate.length);

    // prepare
    testutil.createAndChangeToSubDirectory("generateAppIconSetImage");

    let sourceFolderName = "images-for-generator";
    let listFilePath = testutil.getSupportFilePath(sourceFolderName);
    fse.copySync(listFilePath, sourceFolderName);
    let files = fse.readdirSync(sourceFolderName);
    t.true(files.length > 0);
    let sourcePath = path.join(sourceFolderName,files[0]);


    // test
    var generator = new IconGenerator();

    t.false(fs.existsSync("./output/Assets.xcassets/cloud.appiconset"));
    t.false(fs.existsSync("./output/Assets.xcassets/cloud.appiconset/Contents.json"));

    await generator.generateIconSetFolder("./output/Assets.xcassets", "cloud").then(function(appsetFolder){

        t.true(fs.existsSync("./output/Assets.xcassets/cloud.appiconset"));
        t.true(fs.existsSync("./output/Assets.xcassets/cloud.appiconset/Contents.json"));

        return generator.generateAppIconSetImage(sourcePath, appsetFolder).then(function(){

            iconTemplate.forEach(function (item) {

                t.true(fs.existsSync(path.join("./output/Assets.xcassets/cloud.appiconset", item.filename)));

            });

        });

    });

});


test.serial('AssetGenerator.startGenerateIcons',async t => {

    testutil.createAndChangeToSubDirectory("startGenerateIcons");

    let sourceFolderName = "images-for-generator";
    let listFilePath = testutil.getSupportFilePath(sourceFolderName);
    fse.copySync(listFilePath, sourceFolderName);
    let files = fse.readdirSync(sourceFolderName);
    t.true(files.length > 0);
    let sourcePath = path.join(sourceFolderName,files[0]);


    var generator = new IconGenerator();

    generator.startGenerateIcons("./source", "./output/Assets.xcassets").then(function(){

    });

    t.pass();

});