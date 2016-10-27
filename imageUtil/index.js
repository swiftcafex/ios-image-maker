/*jshint node: true, bitwise:true, curly:true, forin:true, noarg:true, noempty:true, nonew:true, undef:true, strict:true, browser:true, node:true, asi:false, evil: true, nomen: true, esversion: 6 */
'use strict';
var config = require("./config");
var imageutil = require("./imageutil");

config.init().then(function(configList){	

	configList.forEach(function(item){

		imageutil.generate(item);	
		
	});
	

});

