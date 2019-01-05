let fs = require('fs');
let path = require("path");
var xcode = require("xcode");

let Config = require("../config");

// Initialize

function CommandInit() {

    this.defaultSourceDirectory = "./sourceImages";
    this.defaultAssetName = "assets";
    this.defaultIconName = "icon";

}

CommandInit.prototype.doInit = function() {

    // find project folder in current working directory.
    let xcodeProjectPath = this.findXcodeProjectFilePath();

    if(xcodeProjectPath) {

        let assetPath = this.findAssetPathFromProject(xcodeProjectPath);

        if(assetPath) {

            let paths = this.createDefaultSourcePaths();

            if(paths) {

                let config = new Config();
                config.addAssetItem(paths.asset,assetPath);
                config.addIconItem(paths.icon, assetPath);
                config.writeFile();

                console.log("init finished.");

            } else {

                console.log("the directory ./sourceImages already exists. ");

            }

        } else {

            console.log("can not find asset path in your project.");

        }


    } else {

        console.log("can not find xcode project file.");

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

    return {"asset": sourceAssets, "icon": sourceIcon };

};

CommandInit.prototype._findParentGroupIDAndPath = function(proj, currentID) {


    let allGroups = proj.hash.project.objects['PBXGroup'];

    for(var key in allGroups) {

        var childrens = allGroups[key]["children"];
        if(childrens) {

            for(var index = 0; index < childrens.length; index++) {

                var childItem = childrens[index];

                if(childItem.value == currentID) {

                    return {"key": key, "path": allGroups[key]["path"] };

                }

            }

        }

    }

}

CommandInit.prototype.findAssetPathFromProject = function (projectFilePath) {

    if(projectFilePath) {

        let proj = xcode.project(projectFilePath);

        proj.parseSync();

        let fileReferences = proj.pbxFileReferenceSection();

        let projectSecion = proj.pbxProjectSection();
        let mainGroupID = projectSecion[Object.keys(projectSecion)[0]].mainGroup;

        var assetPath;
        var assetKey;

        // find asset id
        for(let key in fileReferences) {

            if(fileReferences[key].isa) {

                if(fileReferences[key]["lastKnownFileType"] == "folder.assetcatalog") {

                    assetPath = fileReferences[key]["path"];
                    assetKey = key;
                    break;


                }


            }


        }

        if(assetKey) {

            let currentItemID = assetKey;
            let pathList = [];
            // asset founded, check the group.
            do {

                var assetGroupID = this._findParentGroupIDAndPath(proj, currentItemID);
                currentItemID = assetGroupID.key;
                if(assetGroupID.path) pathList.unshift(assetGroupID.path);

            } while(mainGroupID && (assetGroupID.key != mainGroupID));

            pathList.push(assetPath);


            var assetFullPath = "./";

            pathList.forEach(function (item) {

                assetFullPath = path.join(assetFullPath, item);

            });

            return assetFullPath;

        }

    }

    return false;

}

CommandInit.prototype.findXcodeProjectFilePath = function () {

    let contents = fs.readdirSync("./");

    let projectPath;

    for (var i = 0; i < contents.length; i++) {

        let filename = contents[i];

        if(path.extname(filename) == ".xcodeproj") {

            projectPath = filename;
            break;

        }

    }

    if(projectPath) {

        let filePath;

        let projectContents = fs.readdirSync(path.join("./", projectPath));

        for (var i = 0; i < projectContents.length; i++) {

            let filename = projectContents[i];

            if(path.extname(filename) == ".pbxproj") {

                filePath = path.join("./", projectPath, filename);
                break;

            }

        }

        if(filePath) {

            return filePath;

        }

    }

    return false;

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