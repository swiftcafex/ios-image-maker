'use strict';

import test from 'ava';


let testutil = require("../testutil/testutil");
testutil.bindWorkingDIR("test-config");

var Config = require("../config");

var path = require("path");
var fs = require("fs");

test.before("create working dir", t => {

    testutil.createAndChangeToWorkingDirectory();

});

test.after.always("clean working dir", t => {

    testutil.cleanWorkingDIR();

});

test.serial("create default source paths", t =>{

    let subdir = "create-default-sources";
    testutil.createAndChangeToSubDir(subdir);

    let config = new Config();
    config.createDefaultSourcesSync();

});

test.serial("init config file", t => {

    let subdir = "init-config";
    testutil.createAndChangeToSubDir(subdir);

    let config = new Config();

    config.configPath = path.join(testutil.workingDirectoryPath, subdir, "config.json");
    config.addAssetItem("./inputdir", "./outputdir");
    config.writeFile();

    let expectedResult = {
        "items": [
            {
                "configType": "assets",
                "sourcePath": "./inputdir",
                "destPath": "./outputdir"
            }
        ]
    };


    let fileContent = fs.readFileSync(config.configPath, "utf8");
    let fileJSON = JSON.parse(fileContent);

    t.is(JSON.stringify(fileJSON), JSON.stringify(expectedResult));

    t.pass();

});

test.skip('read config from file', async t => {

    var configPath = "./image-config.json";
    var config = new Config();

    t.true(fs.existsSync(configPath));

    var configContent = fs.readFileSync(configPath, "utf8");

    await config.readFile().then(function(data) {

        t.is(data, configContent);


    });

    t.pass();

});

test.skip('parse config file items', async t => {

    var configPath = "./image-config.json";
    var config = new Config();

    t.true(fs.existsSync(configPath));

    var configContent = fs.readFileSync(configPath, "utf8");

    await config.parseFile(configContent).then(function(items){

        t.is(items.length, 2);
        t.is(items[0]['type'], 'assets');
        t.is(items[0]['sourcePath'], './sourceImages/assets');
        t.is(items[0]['destPath'], './image-example/Assets.xcassets');

        t.is(items[1]['type'], 'icon');
        t.is(items[1]['sourcePath'], "./sourceImages/icon");
        t.is(items[1]['destPath'], "./image-example/Assets.xcassets");

    });

    t.pass();

});

test.skip('Config.init', async t => {

    var config = new Config();

    var workingDIR = path.join(__dirname, "test-support/test-config");
    process.chdir(workingDIR);

    await config.init().then(function(items){

        t.is(items.length, 2);
        t.is(items[0]['type'], 'assets');
        t.is(items[0]['sourcePath'], './sourceImages/assets');
        t.is(items[0]['destPath'], './image-example/Assets.xcassets');

        t.is(items[1]['type'], 'icon');
        t.is(items[1]['sourcePath'], "./sourceImages/icon");
        t.is(items[1]['destPath'], "./image-example/Assets.xcassets");

    });

    t.pass();

});