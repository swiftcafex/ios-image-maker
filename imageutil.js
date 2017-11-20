/*jshint node: true, bitwise:true, curly:true, forin:true, noarg:true, noempty:true, nonew:true, undef:true, strict:true, browser:true, node:true, asi:false, evil: true, nomen: true, esversion: 6 */
'use strict';


var fs = require("fs.extra");
var PromiseKit = require("promise");
var path = require("path");
var sizeOf = require('image-size');
var queue = require('queue');

function ImageUtil() {

}	

ImageUtil.prototype.listfolder = function(folderPath) {

	return new PromiseKit(function(fullfill, reject){

		fs.readdir(folderPath, function(err, files) {

			if(err) {

				reject(err);

			} else {

				//Convert fileName to full path.
				fullfill(files.map(function(item){ return path.join(folderPath,item) }));

			}

		});

	});	

};


ImageUtil.prototype.generateIconStructure = function(assetPath, assetName) {

	var assetPath = path.join(assetPath, assetName) + ".appiconset";
	var exists = fs.existsSync(assetPath);
	
	if(!exists) {

		fs.mkdirSync(assetPath);
		
	}
	
	return this.generateContentJSON(assetPath);

};

/**
 * 为指定图片生成 Asset 目录结构
 * 
 * @param  {string} sourcePath 原始文件路径
 * @param {string} assetPath Asset 资源路径
 */
ImageUtil.prototype.generateAssetStructure = function(sourceFilePath, assetPath) {
	
	var assetFolder = path.join(assetPath, path.basename(sourceFilePath, path.extname(sourceFilePath))) + ".imageset";

	if(!fs.existsSync(assetFolder)) {

		// make necessary directory recursively
		fs.mkdirpSync(assetFolder);
		
	}

	return this.generateContentJSON(assetFolder);

};

/**
 *
 * Generate Contents.json file for single image,
 *
 * @param imageAssetFolder	the full path for the image asset. example: project/Assets.xcassets/cloud.imageset
 * @param images (optional) the images for this asset. example:  cloud.jpg cloud@2x.jpg cloud@3x.jpg
 *
 * if images parameter not provide, generate Contents.json with null images field like this:
 *
 * {
 *  "info": {
 *    "version": 1,
 *    "author": "xcode"
 *  }
 * }
 *
 * @returns {*|Promise}
 */
ImageUtil.prototype.generateContentJSON = function(imageAssetFolder, images) {

	return new PromiseKit(function(fullfill, reject) {

		var initialContent = {
			"images" : images,
			"info" : {
				"version" : 1,
				"author" : "xcode"
			}
		};

		var jsonString = JSON.stringify(initialContent, null, 2);
		var contentPath = path.join(imageAssetFolder, "Contents.json");

		fs.writeFile(contentPath, jsonString, function(err){

			if(err) {

				reject(err);

			} else {

				fullfill(imageAssetFolder);

			}

		});


	});

};

ImageUtil.prototype.resizeAndSaveImage = function(imagePath, destWidth, destHeight, destPath) {

	imageQueue.push(function(cb){


	// 	lwip.open(imagePath, function(err, image){
	//
	// 	image.batch()
	// 	.resize(destWidth, destHeight)
	// 	.writeFile(destPath, function(err){
    //
	// 		if(err) {
	// 			Console.log(err);
	// 		}
	// 		Console.log("Generating: " + imagePath + " to " + destPath);
	// 		cb();
    //
	// 	});
    //
	// });
		cb();

	})
	

}

ImageUtil.prototype.generateAndCopyIconImage = function(sourceImagePath, assetFolder) {


	var images = [
		{
	      "size" : "20x20",
	      "idiom" : "iphone",
	      "filename" : "Icon-App-20x20@2x.png",
	      "scale" : "2x"
	    },
	    {
	      "size" : "20x20",
	      "idiom" : "iphone",
	      "filename" : "Icon-App-20x20@3x.png",
	      "scale" : "3x"
	    },
	    {
	      "size" : "29x29",
	      "idiom" : "iphone",
	      "filename" : "Icon-App-29x29@1x.png",
	      "scale" : "1x"
	    },
	    {
	      "size" : "29x29",
	      "idiom" : "iphone",
	      "filename" : "Icon-App-29x29@2x.png",
	      "scale" : "2x"
	    },
	    {
	      "size" : "29x29",
	      "idiom" : "iphone",
	      "filename" : "Icon-App-29x29@3x.png",
	      "scale" : "3x"
	    },
	    {
	      "size" : "40x40",
	      "idiom" : "iphone",
	      "filename" : "Icon-App-40x40@2x.png",
	      "scale" : "2x"
	    },
	    {
	      "size" : "40x40",
	      "idiom" : "iphone",
	      "filename" : "Icon-App-40x40@3x.png",
	      "scale" : "3x"
	    },
	    {
	      "size" : "57x57",
	      "idiom" : "iphone",
	      "filename" : "Icon-App-57x57@1x.png",
	      "scale" : "1x"
	    },
	    {
	      "idiom" : "iphone",
	      "size" : "57x57",
	      "scale" : "2x",
	      "filename" : "Icon-App-57x57@2x.png",
	    },
	    {
	      "size" : "60x60",
	      "idiom" : "iphone",
	      "filename" : "Icon-App-60x60@2x.png",
	      "scale" : "2x"
	    },
	    {
	      "size" : "60x60",
	      "idiom" : "iphone",
	      "filename" : "Icon-App-60x60@3x.png",
	      "scale" : "3x"
	    },
	    {
	      "size" : "20x20",
	      "idiom" : "ipad",
	      "filename" : "Icon-App-20x20@1x.png",
	      "scale" : "1x"
	    },
	    {
	      "size" : "20x20",
	      "idiom" : "ipad",
	      "filename" : "Icon-App-20x20@2x.png",
	      "scale" : "2x"
	    },
	    {
	      "size" : "29x29",
	      "idiom" : "ipad",
	      "filename" : "Icon-App-29x29@1x.png",
	      "scale" : "1x"
	    },
	    {
	      "size" : "29x29",
	      "idiom" : "ipad",
	      "filename" : "Icon-App-29x29@2x.png",
	      "scale" : "2x"
	    },
	    {
	      "size" : "40x40",
	      "idiom" : "ipad",
	      "filename" : "Icon-App-40x40@1x.png",
	      "scale" : "1x"
	    },
	    {
	      "size" : "40x40",
	      "idiom" : "ipad",
	      "filename" : "Icon-App-40x40@2x.png",
	      "scale" : "2x"
	    },
	    {
	      "size" : "76x76",
	      "idiom" : "ipad",
	      "filename" : "Icon-App-76x76@1x.png",
	      "scale" : "1x"
	    },
	    {
	      "size" : "76x76",
	      "idiom" : "ipad",
	      "filename" : "Icon-App-76x76@2x.png",
	      "scale" : "2x"
	    },
	    {
	      "size" : "83.5x83.5",
	      "idiom" : "ipad",
	      "filename" : "Icon-App-83.5x83.5@2x.png",
	      "scale" : "2x"
	    },
	    {
	      "size" : "40x40",
	      "idiom" : "iphone",
	      "filename" : "Icon-App-40x40@1x.png",
	      "scale" : "1x"
	    },
	    {
	      "size" : "60x60",
	      "idiom" : "iphone",
	      "filename" : "Icon-App-60x60@1x.png",
	      "scale" : "1x"
	    },
	    {
	      "size" : "76x76",
	      "idiom" : "iphone",
	      "filename" : "Icon-App-76x76@1x.png",
	      "scale" : "1x"
	    },
	    {
	      "size" : "76x76",
	      "idiom" : "ipad",
	      "filename" : "Icon-App-76x76@3x.png",
	      "scale" : "3x"
	    }
	];

	var self = this;
	// resizeAndSaveImage
	images.forEach(function(item){

		var destSizeArr = item.size.split("x");
		var scale = parseInt(item.scale);				
		var destWidth =  destSizeArr[0] * scale;
		var fileName = item.filename;
		var destPath = path.join(assetFolder, fileName);

		self.resizeAndSaveImage(sourceImagePath, destWidth, destWidth, destPath);		
			
	});

	return this.generateContentJSON(assetFolder, images);

};

/**
 *
 * 生成 asset 路径
 *
 * @param sourceImagePath
 * @param assetFolder
 */
ImageUtil.prototype.generateAssetPath = function(sourceImagePath, imageSetFolderPath, scale){

	if(!scale) scale = "";
    return path.join(imageSetFolderPath, path.basename(sourceImagePath, path.extname(sourceImagePath)) + scale + path.extname(sourceImagePath));

}

ImageUtil.prototype.generateAndCopyImage = function(sourceImagePath, imageSetFolderPath) {

    var filePath3X = this.generateAssetPath(sourceImagePath, imageSetFolderPath, "@3x");
    var filePath2X = this.generateAssetPath(sourceImagePath, imageSetFolderPath, "@2x");
    var filePath1X = this.generateAssetPath(sourceImagePath, imageSetFolderPath, "");

	var images = [
		{
	      "idiom" : "universal",
	      "filename" : path.basename(filePath1X),
	      "scale" : "1x"
	    },
	    {
	      "idiom" : "universal",
	      "filename" : path.basename(filePath2X),
	      "scale" : "2x"
	    },
	    {
	      "idiom" : "universal",
	      "filename" : path.basename(filePath3X),
	      "scale" : "3x"
	    }
	];

	
	var imageSize = sizeOf(sourceImagePath);
	var width = imageSize.width;
	var height = imageSize.height;

	//@3x
	this.resizeAndSaveImage(sourceImagePath, width, height, filePath3X);

	//@2x
	this.resizeAndSaveImage(sourceImagePath, width / 3.0 * 2.0, height / 3.0 * 2.0, filePath2X);

	//@1x
	this.resizeAndSaveImage(sourceImagePath, width / 3.0, height / 3.0, filePath1X);				

	return this.generateContentJSON(assetFolder, images);	

};

ImageUtil.prototype.copyImage = function(sourceImagePath, destFolder) {

	var filePath3X = path.join(destFolder, path.basename(sourceImagePath, path.extname(sourceImagePath)) + "@3x" + path.extname(sourceImagePath));
	var filePath2X = path.join(destFolder, path.basename(sourceImagePath, path.extname(sourceImagePath)) + "@2x" + path.extname(sourceImagePath));
	var filePath1X = path.join(destFolder, path.basename(sourceImagePath, path.extname(sourceImagePath)) + path.extname(sourceImagePath));
	
	var imageSize = sizeOf(sourceImagePath);
	var width = imageSize.width;
	var height = imageSize.height;

	this.resizeAndSaveImage(sourceImagePath, width, height, filePath3X);		
	this.resizeAndSaveImage(sourceImagePath, width / 3.0 * 2.0, height / 3.0 * 2.0, filePath2X);			
	this.resizeAndSaveImage(sourceImagePath, width / 3.0, height / 3.0, filePath1X);				

};

ImageUtil.prototype.generate = function(configItem) {

	var sourcePath = configItem.sourcePath;
	var destPath = configItem.destPath;
	var type = configItem.type;

	
	var self = this;
		
	this.listfolder(sourcePath).then(function(files){

		files.forEach(function(filePath) {

			if(type === "assets") {
				
				self.generateAssetStructure(filePath, destPath).then(function(assetFolder){

					self.generateAndCopyImage(filePath, assetFolder);

				});	

			} else if (type === "bundle") {

				self.copyImage(filePath, destPath);

			} else if(type === "icon") {

				self.generateIconStructure(destPath, configItem.name).then(function(assetFolder){

					self.generateAndCopyIconImage(filePath, assetFolder);
	 
				});

			}
			

		});


	});

};


module.exports = new ImageUtil();