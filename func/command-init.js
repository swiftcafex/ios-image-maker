let fs = require('fs');
let path = require("path");

let Config = require("../config");

// Initialize

function CommandInit() {

    this.defaultSourceDirectory = "./sourceImages";
    this.defaultAssetName = "assets";
    this.defaultIconName = "icon";

}

CommandInit.prototype.doInit = function() {

    console.log("create ./sourceImages");

    if(this.createDefaultSourcePaths()) {



    } else {

        console.log("the directory ./sourceImages already exists. ");

    }

};


/***
 * Create paths for source images.
 *
 * @return return true if create success.  false if source dir already exists.
 */
CommandInit.prototype.createDefaultSourcePaths = function() {


    if (fs.existsSync(this.defaultSourceDirectory) == false) {

        fs.mkdirSync(this.defaultSourceDirectory);

    } else {

        return false;

    }

    let sourceAssets = path.join(this.defaultSourceDirectory, this.defaultAssetName);
    let sourceIcon = path.join(this.defaultSourceDirectory, this.defaultIconName);

    if (fs.existsSync(sourceAssets) == false) {
        fs.mkdirSync(sourceAssets);
    }

    if (fs.existsSync(sourceIcon) == false) {
        fs.mkdirSync(sourceIcon);
    }

    return true;

};


CommandInit.prototype.findAssetPath = function () {



};

CommandInit.prototype.findXcodeProjectFilePath = function () {

    let contents = fs.readdirSync("./");


};

/**
 * Create config file
 * @returns {boolean}
 */
CommandInit.prototype.createConfigFileSync = function () {

    var conf = new Config();

    var configPath = "./image-config.json";

    if(fs.existsSync(configPath)) {

        // if file already exist, return fasle
        return false

    }

    var defaultJSON = {

        "items": [

            {
                "type" : "assets",
                "sourcePath": sourceImagePath ,
                "destPath" : "./image-example/Assets.xcassets"
            },
            {
                "type" : "icon",
                "sourcePath": iconImagePath ,
                "destPath" : "./image-example/Assets.xcassets",
                "name" : "Icon"
            }
        ]

    }

    var jsonString = JSON.stringify(defaultJSON, null, "\t");


    fs.writeFile(configPath, jsonString, function(){

        callback();

    });


};


function doInit(callback) {

    var configPath = "./image-config.json";

    // Default Config file

    var sourceDir = "./sourceImages";
    var sourceImagePath = "./sourceImages/assets";
    var iconImagePath = "./sourceImages/icon";

    var defaultJSON = {

        "items": [

            {
                "type" : "assets",
                "sourcePath": sourceImagePath ,
                "destPath" : "./image-example/Assets.xcassets"
            },
            {
                "type" : "icon",
                "sourcePath": iconImagePath ,
                "destPath" : "./image-example/Assets.xcassets",
                "name" : "Icon"
            }
        ]

    }

    var jsonString = JSON.stringify(defaultJSON, null, "\t");

    fs.mkdirSync(sourceDir);
    fs.mkdirSync(sourceImagePath);
    fs.mkdirSync(iconImagePath);

    fs.writeFile(configPath, jsonString, function(){

        callback();

    });

}

// create config file
function createConfigFile() {

    var configPath = "./image-config.json";

    if(fs.existsSync(configPath)) {

        // if file already exist, return fasle
        return false

    }

    var defaultJSON = {

        "items": [

            {
                "type" : "assets",
                "sourcePath": sourceImagePath ,
                "destPath" : "./image-example/Assets.xcassets"
            },
            {
                "type" : "icon",
                "sourcePath": iconImagePath ,
                "destPath" : "./image-example/Assets.xcassets",
                "name" : "Icon"
            }
        ]

    }

    var jsonString = JSON.stringify(defaultJSON, null, "\t");


    fs.writeFile(configPath, jsonString, function(){

        callback();

    });

}

module.exports = new CommandInit();