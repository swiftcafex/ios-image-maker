#!/usr/bin/env node
'use strict';

var config = require("./config");
var imageutil = require("./imageutil");

config.init().then(function(configList){	

	configList.forEach(function(item){

		imageutil.generate(item);	
		
	});
	

});

