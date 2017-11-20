/*jshint node: true, bitwise:true, curly:true, forin:true, noarg:true, noempty:true, nonew:true, undef:true, strict:true, browser:true, node:true, asi:false, es5: true, evil: true, nomen: true */
'use strict';

var fs = require("fs");

function Config() {

	this.configPath = "./image-config.json";

}

// Read config file
Config.prototype.readFile = function() {
	
	var that = this;

	return new Promise(function(resolve, reject){

		fs.readFile(that.configPath, "utf-8", function(err, data){
			
			if(err) {

				reject(err);

			} else {

                resolve(data);

			}

		});		

	});
	
};

// Parse content of config file.
Config.prototype.parseFile = function(data) {
	
	return new Promise(function(resolve, reject){

		try {

			var config = JSON.parse(data);
			var items = config.items;
			
			if(items) {

                resolve(items);

			} else {

				reject("items parse failed.");

			}

		} catch (ex) {

			reject(ex);

		}
		

	});	

};

Config.prototype.init = function() {

	var self = this;
	return this.readFile().then(function(data) {
		
		return self.parseFile(data);

	}).catch(function(err){

		// config file does not exist.

	});

};

module.exports = new Config();