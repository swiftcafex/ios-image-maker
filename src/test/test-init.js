'use strict';

import test from 'ava';

var initFunc = require("../func/init.func");
var path = require("path");

test('test init', t => {

    var workingDIR = path.join(__dirname, "_support");
    process.chdir(workingDIR);

    initFunc(function(){



    });

    t.pass();



});
