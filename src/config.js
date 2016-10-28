/*jshint node: true, bitwise:true, curly:true, forin:true, noarg:true, noempty:true, nonew:true, undef:true, strict:true, browser:true, node:true, asi:false, es5: true, evil: true, nomen: true */
'use strict';

var fs = require("fs");
var PromiseKit = require("promise");
var Console = require("./console");

function Config() {

	this.sourcePath = "";
	this.assetPath = "";
	this.configPath = "image-config.json";

}

Config.prototype.readfile = function() {
	
	var that = this;

	return new PromiseKit(function(fullfill, reject){

		Console.log("Reading config file...");
		fs.readFile(that.configPath, "utf-8", function(err, data){
			
			if(err) {
				Console.log("Read failed");
				reject(err);

			} else {
				Console.log("Read success");
				fullfill(data);

			}

		});		

	});
	
};

Config.prototype.parsefile = function(data) {
	
	return new PromiseKit(function(fullfill, reject){

		try {

			Console.log("Parsing config file...");
			var config = JSON.parse(data);
			var items = config.items;
			
			if(items) {
				Console.log("Parse success!");
				fullfill(items);

			} else {
				Console.log("No config items!");
				reject("items parse failed.");

			}


		} catch (ex) {
			Console.log("Parse failed! " + ex);
			reject(ex);

		}
		

	});	

};

Config.prototype.init = function() {

	var self = this;
	return this.readfile().then(function(data) {
		
		return self.parsefile(data);

	});

};

module.exports = new Config();