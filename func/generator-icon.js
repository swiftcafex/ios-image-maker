"use strict";

var Generator = require('./generator');

var path = require("path");
var fs = require("fs.extra");
var iconTemplate = require("./app-icon-template");

function IconGenerator() {

    Generator.call(this);

}

IconGenerator.prototype = Object.create(Generator.prototype);

/**
 * Generate .appiconset folder for the icon image.
 * @param assetPath .xcassets folder to generate the .appiconset sub folder
 * @param iconSetName name of the .appiconset folder
 * @returns {*|Promise}
 */
IconGenerator.prototype.generateIconSetFolder = function(assetPath, iconSetName) {

    var iconSetPath = path.join(assetPath, iconSetName) + ".appiconset";
    var exists = fs.existsSync(iconSetPath);

    if(!exists) {

        fs.mkdirpSync(iconSetPath);

    }

    return this.generateContentJSON(iconSetPath);

};


IconGenerator.prototype.generateAppIconSetImage = function(sourceImagePath, assetFolder) {

    var images = iconTemplate;

    var self = this;

    var promiseList = [];

    // resizeAndSaveImage
    images.forEach(function(item){

        var destSizeArr = item.size.split("x");
        var scale = parseInt(item.scale);
        var destWidth =  destSizeArr[0] * scale;
        var fileName = item.filename;
        var destPath = path.join(assetFolder, fileName);

        promiseList.push(self.resizeAndCopyImage(sourceImagePath, destWidth, destWidth, destPath));

    });

    promiseList.push(this.generateContentJSON(assetFolder, images));

    return Promise.all(promiseList);

};

IconGenerator.prototype.startGenerateIcons = function(sourcePath, destPath) {

    var self = this;

    return new Promise(function(resolve){

        self.listFiles(sourcePath).then(function(files){

            var taskList = [];

            files.forEach(function(filePath){

                var iconSetName = path.basename(filePath, path.extname(filePath));

                var task = self.generateIconSetFolder(destPath, iconSetName).then(function(appSetFolder){

                    return self.generateAppIconSetImage(filePath, appSetFolder);

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

module.exports = IconGenerator;