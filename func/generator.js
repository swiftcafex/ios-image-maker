"use strict";

/**
 * Created by cafe on 2017/11/18.
 */

let fs = require('fs');
let path = require('path');
let jimp = require('jimp');

function BaseGenerator() {

}

/**
 * List all files in a directory.
 * @param folderPath    the directory to be list.
 * @returns {Promise}   A promise contains all the files in the directory.
 */
BaseGenerator.prototype.listFiles = function(folderPath) {

    return new Promise(function(resolve, reject){

        fs.readdir(folderPath, function(err, files) {

            if(err) {

                reject(err);

            } else {

                //Convert fileName to full path.
                resolve(files.map(function(item){ return path.join(folderPath,item) }));

            }

        });

    });

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
BaseGenerator.prototype.generateContentJSON = function(imageSetFolderPath, images) {

    return new Promise(function(resolve, reject) {

        var initialContent = {
            "images" : images,
            "info" : {
                "version" : 1,
                "author" : "xcode"
            }
        };

        var jsonString = JSON.stringify(initialContent, null, 2);

        var contentJSONPath = path.join(process.cwd(), imageSetFolderPath, "Contents.json");

        fs.writeFile(contentJSONPath, jsonString, 'utf-8',function(err) {

            if(err) {

                var exist = fs.existsSync(imageSetFolderPath);

                console.log("write failed, " + err);
                console.log("write failed cwd" + process.cwd());
                console.log("write failed path exist:" + exist + "  :path:" + imageSetFolderPath );

                reject(err);

            } else {

                resolve(imageSetFolderPath);

            }

        });


    });

};


/**
 * Resize image from imagePath and copy it to destPath
 * @param imagePath source image path.
 * @param destWidth image width to resize.
 * @param destHeight image height to resize.
 * @param destPath  path to save the resized image.
 * @returns {Promise} A promise indicate the resize result.
 */
BaseGenerator.prototype.resizeAndCopyImage = function(imagePath, destWidth, destHeight, destPath) {

    return new Promise(function(resolve, reject){

        jimp.read(imagePath, function(err, image){

            if(err) {

                reject(err);

            } else {

                image.resize(destWidth, destHeight).write(destPath, function(err){

                    if(err) {

                        reject(err);

                    } else {

                        resolve();

                    }

                });


            }

        });

    });

};

module.exports = BaseGenerator;