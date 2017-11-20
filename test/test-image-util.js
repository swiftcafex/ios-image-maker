'use strict';

import test from 'ava';

var imageutil = require("../imageutil");
var config = require("../config");
var path = require("path");
var fs = require('fs');

var workingDIR = path.join(__dirname, "_support/test-imageutil");
process.chdir(workingDIR);

test('ImageUtil.listFolder',async t => {

    await config.init().then(async function(items){

        t.is(items[0]['type'], 'assets');
        t.is(items[0]['sourcePath'], './sourceImages/assets');
        t.is(items[0]['destPath'], './output/Assets.xcassets');

        t.is(items[1]['type'], 'icon');
        t.is(items[1]['sourcePath'], "./sourceImages/icon");
        t.is(items[1]['destPath'], "./output/Assets.xcassets");


        await imageutil.listfolder(items[0]['sourcePath']).then(function(files){

            t.is(files.length, 1);
            t.is(files[0], 'sourceImages/assets/test.png');

        });

        await imageutil.listfolder(items[1]['sourcePath']).then(function(files){

            t.is(files.length, 1);
            t.is(files[0], 'sourceImages/icon/icon.png');

        });

    });

    t.pass();

});

test('ImageUtil.generateContentJSON', async t => {

    await config.init().then(async function(items) {

        t.is(items[0]['type'], 'assets');
        t.is(items[0]['sourcePath'], './sourceImages/assets');
        t.is(items[0]['destPath'], './output/Assets.xcassets');

        t.is(items[1]['type'], 'icon');
        t.is(items[1]['sourcePath'], "./sourceImages/icon");
        t.is(items[1]['destPath'], "./output/Assets.xcassets");

        var sourceFolder = items[0]['sourcePath'];
        var assetPath = items[0]['destPath'];


        await imageutil.listfolder(sourceFolder).then(function(files){

            t.is(files.length, 1);
            var sourcePath = files[0];
            var assetFolder = path.join(assetPath, path.basename(sourcePath, path.extname(sourcePath))) + ".imageset";


            imageutil.generateAssetStructure(sourcePath, assetPath).then(function() {

                // Contents.json file should be created, after call this method.
                var contentPath = path.join(assetFolder, 'Contents.json');
                t.true(fs.existsSync(contentPath));

            })

        });

    });

    t.pass();

});