"use strict";
import test from 'ava';

let testutil = require("../testutil/testutil");

var IconGenerator = require("../func/generator-icon");
var path = require("path");
var fs = require("fs");
var fse = require("fs-extra");

var iconTemplate = require("../func/app-icon-template");


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
    let generator = new IconGenerator();

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


    let generator = new IconGenerator();

    await generator.startGenerateIcons(sourceFolderName, "./output/Assets.xcassets").then(function(){

        console.log("generatae icon finished. ");
        t.true(fs.existsSync("./output/Assets.xcassets/cloud.appiconset"));
        t.true(fs.existsSync("./output/Assets.xcassets/cloud.appiconset/Contents.json"));

        let expectedResult = {

            "images": [
                {
                    "size": "20x20",
                    "idiom": "iphone",
                    "filename": "Icon-App-20x20@2x.png",
                    "scale": "2x"
                },
                {
                    "size": "20x20",
                    "idiom": "iphone",
                    "filename": "Icon-App-20x20@3x.png",
                    "scale": "3x"
                },
                {
                    "size": "29x29",
                    "idiom": "iphone",
                    "filename": "Icon-App-29x29@1x.png",
                    "scale": "1x"
                },
                {
                    "size": "29x29",
                    "idiom": "iphone",
                    "filename": "Icon-App-29x29@2x.png",
                    "scale": "2x"
                },
                {
                    "size": "29x29",
                    "idiom": "iphone",
                    "filename": "Icon-App-29x29@3x.png",
                    "scale": "3x"
                },
                {
                    "size": "40x40",
                    "idiom": "iphone",
                    "filename": "Icon-App-40x40@2x.png",
                    "scale": "2x"
                },
                {
                    "size": "40x40",
                    "idiom": "iphone",
                    "filename": "Icon-App-40x40@3x.png",
                    "scale": "3x"
                },
                {
                    "size": "57x57",
                    "idiom": "iphone",
                    "filename": "Icon-App-57x57@1x.png",
                    "scale": "1x"
                },
                {
                    "idiom": "iphone",
                    "size": "57x57",
                    "scale": "2x",
                    "filename": "Icon-App-57x57@2x.png"
                },
                {
                    "size": "60x60",
                    "idiom": "iphone",
                    "filename": "Icon-App-60x60@2x.png",
                    "scale": "2x"
                },
                {
                    "size": "60x60",
                    "idiom": "iphone",
                    "filename": "Icon-App-60x60@3x.png",
                    "scale": "3x"
                },
                {
                    "size": "20x20",
                    "idiom": "ipad",
                    "filename": "Icon-App-20x20@1x.png",
                    "scale": "1x"
                },
                {
                    "size": "20x20",
                    "idiom": "ipad",
                    "filename": "Icon-App-20x20@2x.png",
                    "scale": "2x"
                },
                {
                    "size": "29x29",
                    "idiom": "ipad",
                    "filename": "Icon-App-29x29@1x.png",
                    "scale": "1x"
                },
                {
                    "size": "29x29",
                    "idiom": "ipad",
                    "filename": "Icon-App-29x29@2x.png",
                    "scale": "2x"
                },
                {
                    "size": "40x40",
                    "idiom": "ipad",
                    "filename": "Icon-App-40x40@1x.png",
                    "scale": "1x"
                },
                {
                    "size": "40x40",
                    "idiom": "ipad",
                    "filename": "Icon-App-40x40@2x.png",
                    "scale": "2x"
                },
                {
                    "size": "76x76",
                    "idiom": "ipad",
                    "filename": "Icon-App-76x76@1x.png",
                    "scale": "1x"
                },
                {
                    "size": "76x76",
                    "idiom": "ipad",
                    "filename": "Icon-App-76x76@2x.png",
                    "scale": "2x"
                },
                {
                    "size": "83.5x83.5",
                    "idiom": "ipad",
                    "filename": "Icon-App-83.5x83.5@2x.png",
                    "scale": "2x"
                },
                {
                    "size": "40x40",
                    "idiom": "iphone",
                    "filename": "Icon-App-40x40@1x.png",
                    "scale": "1x"
                },
                {
                    "size": "60x60",
                    "idiom": "iphone",
                    "filename": "Icon-App-60x60@1x.png",
                    "scale": "1x"
                },
                {
                    "size": "76x76",
                    "idiom": "iphone",
                    "filename": "Icon-App-76x76@1x.png",
                    "scale": "1x"
                },
                {
                    "size": "76x76",
                    "idiom": "ipad",
                    "filename": "Icon-App-76x76@3x.png",
                    "scale": "3x"
                }
            ],
            "info": {
                "version": 1,
                "author": "xcode"
            }
        };

        let fileContent = fs.readFileSync("./output/Assets.xcassets/cloud.appiconset/Contents.json", "utf-8");

        t.is(JSON.stringify(JSON.parse(fileContent)),JSON.stringify(expectedResult));

    });


});