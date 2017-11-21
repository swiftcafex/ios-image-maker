/*jshint node: true, bitwise:true, curly:true, forin:true, noarg:true, noempty:true, nonew:true, undef:true, strict:true, browser:true, node:true, asi:false, evil: true, nomen: true, esversion: 6 */
'use strict';


var fs = require("fs.extra");
var path = require("path");

var IconGenerator = require("./func/generator-icon");
var AssetGenerator = require("./func/generator-asset");
var BundleGenerator = require("./func/generator-bundle");

function ImageUtil() {

}

ImageUtil.prototype.generate = function(configItem) {

	var sourcePath = configItem.sourcePath;
	var destPath = configItem.destPath;
	var type = configItem.type;

	if(type === "assets") {

		var assetGenerator = new AssetGenerator();
		assetGenerator.startGenerateImages(sourcePath, destPath);

	} else if(type === "bundle") {

		// var bundleGenerator = new BundleGenerator();

	} else if(type === "icon") {

		var iconGenerator = new IconGenerator();
		iconGenerator.startGenerateIcons(sourcePath, destPath);

	}

};


module.exports = new ImageUtil();