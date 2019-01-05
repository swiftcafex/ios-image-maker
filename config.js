/*jshint node: true, bitwise:true, curly:true, forin:true, noarg:true, noempty:true, nonew:true, undef:true, strict:true, browser:true, node:true, asi:false, es5: true, evil: true, nomen: true */
'use strict';

var fs = require("fs");

function ConfigItemAsset() {

	this.type = "assets";
	this.sourcePath = "";
	this.destPath = "";

}

function ConfigItemIcon() {

    this.type = "icon";
    this.sourcePath = "";
    this.destPath = "";

}

function Config() {

	this.configPath = "./image-config.json";
	this.items = [];

}

/***
 * add asset image item
 * @param sourcePath	source image path
 * @param destPath		generated image path
 */
Config.prototype.addAssetItem = function(sourcePath, destPath) {

	var item = new ConfigItemAsset();
	item.sourcePath = sourcePath;
	item.destPath = destPath;

	this.items.push(item);

};

/***
 * add icon image item
 * @param sourcePath	source image path
 * @param destPath		generated image path
 */
Config.prototype.addIconItem = function (sourcePath, destPath) {

	var item = new ConfigItemIcon();
	item.sourcePath = sourcePath;
	item.destPath = destPath;

	this.items.push(item);

}

/***
 * Write config to file.
 */
Config.prototype.writeFile = function() {

	let jsonResult = {

		"items": this.items

    }

	let jsonString = JSON.stringify(jsonResult, null, "\t");
	fs.writeFileSync(this.configPath, jsonString);

}

Config.prototype.loadConfig = function() {

	let configFileContent = fs.readFileSync(this.conf, 'utf-8');
	let jsonObj = JSON.parse(configFileContent);
	this.items = jsonObj["items"];
	return this.items;

};


module.exports = Config;