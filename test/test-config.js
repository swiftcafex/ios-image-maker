'use strict';

import test from 'ava';

var config = require("../config");
var path = require("path");
var fs = require("fs");

var workingDIR = path.join(__dirname, "_support/test-config");
process.chdir(workingDIR);

test('Config: readfile', async t => {

    var configPath = "./image-config.json";

    t.true(fs.existsSync(configPath));

    var configContent = fs.readFileSync(configPath, "utf8");

    await config.readFile().then(function(data) {

        t.is(data, configContent);


    });

    t.pass();

});
