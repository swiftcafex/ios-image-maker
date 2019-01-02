'use strict';

import test from 'ava';

var ImageUtil = require("../imageutil");
var config = require("../config");
var supportCleaner = require("./test-support/_support-cleaner");
var path = require("path");
var fs = require('fs');


function clean() {

    return supportCleaner.cleanSupportDir([

        {
            "cwd" : path.join(__dirname, "test-support/test-imageutil/generateConfigItem"),
            "dir" : "./output/asset/Assets.xcassets/"
        },
        {
            "cwd" : path.join(__dirname, "test-support/test-imageutil/generateConfigItem"),
            "dir" : "./output/bundle/test.bundle"
        },
        {
            "cwd" : path.join(__dirname, "test-support/test-imageutil/generateConfigItem"),
            "dir" : "./output/icon/Assets.xcassets/"
        }

    ]);
}

test.before(async t => {

    await clean().then(function(){ });

});

test.after(async t => {

    await clean().then(function(){ });

});

test("place holder", t => {

    t.pass();
});

// test('ImageUtil.generateConfigItem', async t => {
//
//     var workingDirectoryPath = path.join(__dirname, "test-support/test-imageutil/generateConfigItem");
//     process.chdir(workingDirectoryPath);
//
//     var assetConfig = {
//
//         "type": "assets",
//         "sourcePath": "./sourceImages/assets",
//         "destPath": "./output/asset/Assets.xcassets"
//
//     };
//
//     t.false(fs.existsSync("./output/asset/Assets.xcassets"));
//     t.false(fs.existsSync("./output/asset/Assets.xcassets/test.imageset/Contents.json"));
//     t.false(fs.existsSync("./output/asset/Assets.xcassets/test.imageset/test.png"));
//     t.false(fs.existsSync("./output/asset/Assets.xcassets/test.imageset/test@2x.png"));
//     t.false(fs.existsSync("./output/asset/Assets.xcassets/test.imageset/test@3x.png"));
//
//     await ImageUtil.generateConfigItem(assetConfig).then(function(){
//
//         t.true(fs.existsSync("./output/asset/Assets.xcassets"));
//         t.true(fs.existsSync("./output/asset/Assets.xcassets/test.imageset/Contents.json"));
//         t.true(fs.existsSync("./output/asset/Assets.xcassets/test.imageset/test.png"));
//         t.true(fs.existsSync("./output/asset/Assets.xcassets/test.imageset/test@2x.png"));
//         t.true(fs.existsSync("./output/asset/Assets.xcassets/test.imageset/test@3x.png"));
//
//     });
//
//
//     var bundleConfig = {
//
//         "type": "bundle",
//         "sourcePath": "./sourceImages/bundle",
//         "destPath": "./output/bundle/test.bundle"
//
//     };
//
//     t.false(fs.existsSync("./output/bundle/test.bundle"));
//     t.false(fs.existsSync("./output/bundle/test.bundle/test.png"));
//     t.false(fs.existsSync("./output/bundle/test.bundle/test@2x.png"));
//     t.false(fs.existsSync("./output/bundle/test.bundle/test@3x.png"));
//
//
//     await ImageUtil.generateConfigItem(bundleConfig).then(function(){
//
//         t.true(fs.existsSync("./output/bundle/test.bundle"));
//         t.true(fs.existsSync("./output/bundle/test.bundle/test.png"));
//         t.true(fs.existsSync("./output/bundle/test.bundle/test@2x.png"));
//         t.true(fs.existsSync("./output/bundle/test.bundle/test@3x.png"));
//
//     });
//
//
//     var iconConfig = {
//
//         "type": "icon",
//         "sourcePath": "./sourceImages/icon",
//         "destPath": "./output/icon/Assets.xcassets"
//
//     };
//
//     t.false(fs.existsSync("./output/icon/Assets.xcassets"));
//     t.false(fs.existsSync("./output/icon/Assets.xcassets/icon.appiconset"));
//
//
//     await ImageUtil.generateConfigItem(iconConfig).then(function(){
//
//         t.true(fs.existsSync("./output/icon/Assets.xcassets"));
//         t.true(fs.existsSync("./output/icon/Assets.xcassets/icon.appiconset"));
//
//     });
//
//
//     t.pass();
//
// });