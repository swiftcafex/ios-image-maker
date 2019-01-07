"use strict";

var Generator = require('./generator');

var sizeOf = require('image-size')
var path = require("path");
var fs = require("fs.extra");


function BundleGenerator() {

    Generator.call(this);

}

BundleGenerator.prototype = Object.create(Generator.prototype);


BundleGenerator.prototype.generateBundleImage = function(sourceImagePath, destBundlePath) {

    if(!fs.existsSync(destBundlePath)) {

        fs.mkdirpSync(destBundlePath);

    }

    var self = this;

    var filePath3X = path.join(destBundlePath, path.basename(sourceImagePath, path.extname(sourceImagePath)) + "@3x" + path.extname(sourceImagePath));
    var filePath2X = path.join(destBundlePath, path.basename(sourceImagePath, path.extname(sourceImagePath)) + "@2x" + path.extname(sourceImagePath));
    var filePath1X = path.join(destBundlePath, path.basename(sourceImagePath, path.extname(sourceImagePath)) + path.extname(sourceImagePath));

    return new Promise(function(resolve, reject){

        sizeOf(sourceImagePath, function(err, imageSize){

            if(err) {

                reject(err);

            } else {

                var width = imageSize.width;
                var height = imageSize.height;

                var promises = [];

                promises.push(self.resizeAndCopyImage(sourceImagePath, width, height, filePath3X));
                promises.push(self.resizeAndCopyImage(sourceImagePath, width / 3.0 * 2.0, height / 3.0 * 2.0, filePath2X));
                promises.push(self.resizeAndCopyImage(sourceImagePath, width / 3.0, height / 3.0, filePath1X));

                resolve(promises);

            }

        });

    }).then(function(promises){

        return Promise.all(promises);

    });

};

BundleGenerator.prototype.startGenerateBundle = function(sourcePath, destPath) {

    var self = this;

    return new Promise(function(resolve){

        self.listFiles(sourcePath).then(function(files){

            var taskList = [];

            files.forEach(function(filePath){

                var task = self.generateBundleImage(filePath, destPath);
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

module.exports = BundleGenerator;