
import test from 'ava';

var AssetGenerator = require("../func/generator-asset");
var path = require("path");
var fs = require("fs.extra");

test.before(async t => {

    var workingDirList = [
        path.join(__dirname, "_support/test-generator-asset/generateImageSetFolder"),
        path.join(__dirname, "_support/test-generator-asset/generateImageSetImages"),
        path.join(__dirname, "_support/test-generator-asset/startGenerateImages")

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

test('AssetGenerator.generateImageSetFolder',async t => {

    var workingDIR = path.join(__dirname, "_support/test-generator-asset/generateImageSetFolder");
    process.chdir(workingDIR);

    var generator = new AssetGenerator();

    t.false(fs.existsSync("./output/Assets.xcassets/cloud.imageset"));
    t.false(fs.existsSync("./output/Assets.xcassets/cloud.imageset/Contents.json"));

    await generator.generateImageSetFolder("./source/cloud.jpg", "./output/Assets.xcassets").then(function(imagesetPath){

        t.true(fs.existsSync("./output/Assets.xcassets/cloud.imageset"));
        t.true(fs.existsSync("./output/Assets.xcassets/cloud.imageset/Contents.json"));

    });

    t.pass();

});

test('AssetGenerator.generateImageSetImages',async t => {

    var workingDIR = path.join(__dirname, "_support/test-generator-asset/generateImageSetImages");
    process.chdir(workingDIR);

    var generator = new AssetGenerator();

    t.false(fs.existsSync("./output/Assets.xcassets/cloud.imageset"));
    t.false(fs.existsSync("./output/Assets.xcassets/cloud.imageset/Contents.json"));
    t.false(fs.existsSync("./output/Assets.xcassets/cloud.imageset/cloud.jpg"));
    t.false(fs.existsSync("./output/Assets.xcassets/cloud.imageset/cloud@2x.jpg"));
    t.false(fs.existsSync("./output/Assets.xcassets/cloud.imageset/cloud@3x.jpg"));

    //Step1: generate .imageset folder
    await generator.generateImageSetFolder("./source/cloud.jpg", "./output/Assets.xcassets").then(function(imagesetPath){

        //Step2: copy and resize source image to .imageset folder
        generator.generateImagesetImages("./source/cloud.jpg", imagesetPath).then(function(){

            // Image files should be created.

            t.true(fs.existsSync("./output/Assets.xcassets/cloud.imageset"));
            t.true(fs.existsSync("./output/Assets.xcassets/cloud.imageset/Contents.json"));
            t.true(fs.existsSync("./output/Assets.xcassets/cloud.imageset/cloud.jpg"));
            t.true(fs.existsSync("./output/Assets.xcassets/cloud.imageset/cloud@2x.jpg"));
            t.true(fs.existsSync("./output/Assets.xcassets/cloud.imageset/cloud@3x.jpg"));

        });

    });


    t.pass();

});

test('AssetGenerator.startGenerateImages',async t => {

    var workingDIR = path.join(__dirname, "_support/test-generator-asset/startGenerateImages");
    process.chdir(workingDIR);

    var generator = new AssetGenerator();

    var sourcePath = "./source";
    var assetPath = "./output/Assets.xcassets";

    await generator.startGenerateImages(sourcePath, assetPath).then(function() {

        console.log("generate finished");

    });

    t.pass();

});