var Generator = require('./generator');
var fs = require('fs.extra');
var path = require('path');
var sizeOf = require('image-size');


function AssetGenerator() {

    Generator.call(this);

}

AssetGenerator.prototype = Object.create(Generator.prototype);

AssetGenerator.prototype.generateFile = function() {

}

/**
 *
 * Generate .imageset folder, and a default Contents.json file.
 *
 * @param sourceFilePath: source image file path.
 *
 *      example: ./sourceImages/assets/cloud.jpg
 *
 * @param assetPath: path to create .imageset folder
 *
 *      example: ./image-example/Assets.xcassets
 *
 * @returns {*|Promise}
 */
AssetGenerator.prototype.generateImageSetFolder = function(sourceFilePath, assetPath) {

    // ./sourceImages/assets/[cloud].jpg && [./image-example/Assets.xcassets] => ./image-example/Assets.xcassets/cloud.imageset
    var imagesetFolder = path.join(assetPath, path.basename(sourceFilePath, path.extname(sourceFilePath))) + ".imageset";

    if(!fs.existsSync(imagesetFolder)) {

        // create .imageset folder, if not exist.
        fs.mkdirpSync(imagesetFolder);

    }

    return this.generateContentJSON(imagesetFolder);

};


AssetGenerator.prototype.generateAssetPath = function(sourceImagePath, imageSetFolderPath, scale){

    if(!scale) scale = "";
    return path.join(imageSetFolderPath, path.basename(sourceImagePath, path.extname(sourceImagePath)) + scale + path.extname(sourceImagePath));

}


AssetGenerator.prototype.generateImagesetImages = function(sourceImagePath, imageSetFolderPath) {

    console.log("generate image " + sourceImagePath);

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
    this.resizeAndCopyImage(sourceImagePath, width, height, filePath3X);

    //@2x
    this.resizeAndCopyImage(sourceImagePath, width / 3.0 * 2.0, height / 3.0 * 2.0, filePath2X);

    //@1x
    this.resizeAndCopyImage(sourceImagePath, width / 3.0, height / 3.0, filePath1X);

    return this.generateContentJSON(imageSetFolderPath, images);

};


AssetGenerator.prototype.startGenerateImages = function(sourcePath, destPath) {

    var self = this;



    console.log("start generate image");
    return new Promise(function(resolve){

        self.listFiles(sourcePath).then(function(files){

            var taskList = [];

            files.forEach(function(filePath){

                console.log("generate file " + filePath);
                var task = self.generateImageSetFolder(filePath, destPath).then(function(imageSetPath) {

                    return self.generateImagesetImages(filePath, imageSetPath);

                });

                taskList.push(task);

            });

            return Promise.resolve(taskList);

        }).then(function (taskList) {

            Promise.all(taskList).then(function(){
                resolve();
            });

        });

    });




};

module.exports = AssetGenerator;