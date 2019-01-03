'use strict';

import test from 'ava';


let testutil = require("../testutil/testutil");
let commandInit = require("../func/command-init");

var Config = require("../config");

var path = require("path");
var fs = require("fs");

test.before("create working dir", t => {

    testutil.createAndChangeToWorkingDirectory("test-config");

});

test.after.always("clean working dir", t => {

    testutil.cleanWorkingDirectory();

});

test.serial("do init command", t=> {

    let subdir = "do-init";
    testutil.createAndChangeToSubDirectory(subdir);

    commandInit.doInit();

    t.is(fs.existsSync(commandInit.defaultSourceDirectory), true);
    t.is(fs.existsSync(path.join(commandInit.defaultSourceDirectory, commandInit.defaultAssetName)), true);
    t.is(fs.existsSync(path.join(commandInit.defaultSourceDirectory, commandInit.defaultIconName)), true);



});

test.serial("create default source paths", t =>{

    let subdir = "create-default-sources";
    testutil.createAndChangeToSubDirectory(subdir);

    let success = commandInit.createDefaultSourcePaths();
    t.is(success, true);

    t.is(fs.existsSync(commandInit.defaultSourceDirectory), true);
    t.is(fs.existsSync(path.join(commandInit.defaultSourceDirectory, commandInit.defaultAssetName)), true);
    t.is(fs.existsSync(path.join(commandInit.defaultSourceDirectory, commandInit.defaultIconName)), true);


    // path already exists, should fail.
    let shouldFailed = commandInit.createDefaultSourcePaths();
    t.is(shouldFailed, false);

});

test.serial("init config file", t => {

    let subdir = "init-config";
    testutil.createAndChangeToSubDirectory(subdir);

    let config = new Config();

    config.addAssetItem("./inputdir", "./outputdir");
    config.addIconItem("./inputicon", "./outputicon")
    config.writeFile();

    let expectedResult = {
        "items": [
            {
                "configType": "assets",
                "sourcePath": "./inputdir",
                "destPath": "./outputdir"
            },
            {
                "configType": "icon",
                "sourcePath": "./inputicon",
                "destPath": "./outputicon"
            }
        ]
    };

    let destPath = path.join(testutil.workingDirectoryPath, subdir, "image-config.json");
    let fileContent = fs.readFileSync(destPath, "utf8");
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

    var  configContent = fs.readFileSync(configPath, "utf8");

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