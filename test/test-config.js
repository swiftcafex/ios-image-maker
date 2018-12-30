'use strict';

import test from 'ava';

var Config = require("../config");
var path = require("path");
var fs = require("fs");

var workingDIR = path.join(__dirname, "_support/test-config");
process.chdir(workingDIR);




test("init config file", async t => {

    var dir = "./init-config";

    var config = new Config();

    config.configPath = path.join(workingDIR, dir, "config.json");
    config.addAssetItem("input", "output");
    config.writeFile();

});

test('read config from file', async t => {

    var configPath = "./image-config.json";
    var config = new Config();

    t.true(fs.existsSync(configPath));

    var configContent = fs.readFileSync(configPath, "utf8");

    await config.readFile().then(function(data) {

        t.is(data, configContent);


    });

    t.pass();

});

test('parse config file items', async t => {

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

test('Config.init', async t => {

    var config = new Config();

    var workingDIR = path.join(__dirname, "_support/test-config");
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