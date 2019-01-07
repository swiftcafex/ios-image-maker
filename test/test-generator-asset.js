"use strict";
import test from 'ava';

let testutil = require("../testutil/testutil");

var AssetGenerator = require("../func/generator-asset");

var path = require("path");
var fs = require("fs");
var fse = require("fs-extra");

test.before("create working dir", t => {

    testutil.createAndChangeToWorkingDirectory("test-generator-asset");

});

test.after.always("clean working dir", t => {

    testutil.cleanWorkingDirectory();

});

test.serial('generate imageset folder',async t => {

    // preload
    testutil.createAndChangeToSubDirectory("generateImageSetFolder");

    let sourceFolderName = "images-for-generator";
    let listFilePath = testutil.getSupportFilePath(sourceFolderName);
    fse.copySync(listFilePath, sourceFolderName);
    let files = fse.readdirSync(sourceFolderName);
    t.true(files.length > 0);
    let sourcePath = path.join(sourceFolderName,files[0]);

    // test
    var generator = new AssetGenerator();

    t.false(fs.existsSync("./output/Assets.xcassets/cloud.imageset"));
    t.false(fs.existsSync("./output/Assets.xcassets/cloud.imageset/Contents.json"));

    await generator.generateImageSetFolder(sourcePath, "./output/Assets.xcassets").then(function(imagesetPath){

        t.true(fs.existsSync("./output/Assets.xcassets/cloud.imageset"));
        t.true(fs.existsSync("./output/Assets.xcassets/cloud.imageset/Contents.json"));

        let expectedResult = {
            "info": {
                "version": 1,
                "author": "xcode"
            }
        };

        let content = fs.readFileSync("./output/Assets.xcassets/cloud.imageset/Contents.json", "utf-8");
        t.is(JSON.stringify(JSON.parse(content)), JSON.stringify(expectedResult));

    });

    t.pass();

});

test.serial('AssetGenerator.generateImageSetImages',async t => {

    // preload
    testutil.createAndChangeToSubDirectory("generateImageSetImages");

    let sourceFolderName = "images-for-generator";
    let listFilePath = testutil.getSupportFilePath(sourceFolderName);
    fse.copySync(listFilePath, sourceFolderName);
    let files = fse.readdirSync(sourceFolderName);
    t.true(files.length > 0);
    let sourcePath = path.join(sourceFolderName,files[0]);


    // test
    var generator = new AssetGenerator();

    t.false(fs.existsSync("./output/Assets.xcassets/cloud.imageset"));
    t.false(fs.existsSync("./output/Assets.xcassets/cloud.imageset/Contents.json"));
    t.false(fs.existsSync("./output/Assets.xcassets/cloud.imageset/cloud.jpg"));
    t.false(fs.existsSync("./output/Assets.xcassets/cloud.imageset/cloud@2x.jpg"));
    t.false(fs.existsSync("./output/Assets.xcassets/cloud.imageset/cloud@3x.jpg"));

    //Step1: generate .imageset folder
    await generator.generateImageSetFolder(sourcePath, "./output/Assets.xcassets").then(function(imagesetPath){

        //Step2: copy and resize source image to .imageset folder
        generator.generateImagesetImages(sourcePath, imagesetPath).then(function(){

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

test.serial('AssetGenerator.startGenerateImages',async t => {

    // preload
    testutil.createAndChangeToSubDirectory("generateImageSetImages");

    let sourceFolderName = "images-for-generator";
    let listFilePath = testutil.getSupportFilePath(sourceFolderName);
    fse.copySync(listFilePath, sourceFolderName);
    let files = fse.readdirSync(sourceFolderName);
    t.true(files.length > 0);
    let sourcePath = path.join(sourceFolderName,files[0]);


    // test
    var generator = new AssetGenerator();

    var assetPath = "./output/Assets.xcassets";

    await generator.startGenerateImages(sourceFolderName, assetPath).then(function() {

        t.true(fs.existsSync("./output/Assets.xcassets/cloud.imageset"));
        t.true(fs.existsSync("./output/Assets.xcassets/cloud.imageset/Contents.json"));
        t.true(fs.existsSync("./output/Assets.xcassets/cloud.imageset/cloud.jpg"));
        t.true(fs.existsSync("./output/Assets.xcassets/cloud.imageset/cloud@2x.jpg"));
        t.true(fs.existsSync("./output/Assets.xcassets/cloud.imageset/cloud@3x.jpg"));

        let content = fs.readFileSync("./output/Assets.xcassets/cloud.imageset/Contents.json", "utf-8");
        let expectedResult = {
            "images": [
                {
                    "idiom": "universal",
                    "filename": "cloud.jpg",
                    "scale": "1x"
                },
                {
                    "idiom": "universal",
                    "filename": "cloud@2x.jpg",
                    "scale": "2x"
                },
                {
                    "idiom": "universal",
                    "filename": "cloud@3x.jpg",
                    "scale": "3x"
                }
            ],
            "info": {
                "version": 1,
                "author": "xcode"
            }
        };
        t.is(JSON.stringify(JSON.parse(content)), JSON.stringify(expectedResult));

        t.true(fs.existsSync("./output/Assets.xcassets/disk.imageset"));
        t.true(fs.existsSync("./output/Assets.xcassets/disk.imageset/Contents.json"));
        t.true(fs.existsSync("./output/Assets.xcassets/disk.imageset/disk.jpg"));
        t.true(fs.existsSync("./output/Assets.xcassets/disk.imageset/disk@2x.jpg"));
        t.true(fs.existsSync("./output/Assets.xcassets/disk.imageset/disk@3x.jpg"));

    });

    t.pass();

});