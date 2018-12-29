var fs = require('fs');
// Initialize

function CommandInit() {



}

CommandInit.prototype.doInit = function() {

    

};

/**
 * Create config file
 * @returns {boolean}
 */
CommandInit.prototype.createConfigFileSync = function () {

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

module.exports = CommandInit;