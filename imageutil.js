/*jshint node: true, bitwise:true, curly:true, forin:true, noarg:true, noempty:true, nonew:true, undef:true, strict:true, browser:true, node:true, asi:false, evil: true, nomen: true, esversion: 6 */
'use strict';

var fs = require("fs.extra");

var IconGenerator = require("./func/generator-icon");
var AssetGenerator = require("./func/generator-asset");
var BundleGenerator = require("./func/generator-bundle");

function ImageUtil() {

}

ImageUtil.prototype.generateConfigItem = function(configItem) {

	var sourcePath = configItem.sourcePath;
	var destPath = configItem.destPath;
	var type = configItem.type;

	if(type === "assets") {

		var assetGenerator = new AssetGenerator();
        return assetGenerator.startGenerateImages(sourcePath, destPath);

	} else if(type === "bundle") {

		var bundleGenerator = new BundleGenerator();
		return bundleGenerator.startGenerateBundle(sourcePath,destPath);

	} else if(type === "icon") {

		var iconGenerator = new IconGenerator();
		return iconGenerator.startGenerateIcons(sourcePath, destPath);

	} else {

		return Promise.reject();
	}

};


module.exports = new ImageUtil();