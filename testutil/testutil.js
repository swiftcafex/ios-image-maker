let fs = require("fs");
let path = require("path");
let rimraf = require("rimraf");

/***
 * Util Class to create separator working dir for every tests.
 * @constructor
 */
function TestUtil() {

    this.testSupportContainer = path.join(__dirname, "../", "test/test-support");
    this.testPreloadContainer = path.join(this.testSupportContainer, "preload-files");

    this.workingDirectoryPath = ""
    this.subDirectoryPath = "";

}

/***
 * Create directory belong to specific test in test/test-support folder, and change current working dir to it.
 *
 * @dirName directory name to create and change to.
 *
 */
TestUtil.prototype.createAndChangeToWorkingDirectory = function (dirName) {

    this.workingDirectoryPath = path.join(this.testSupportContainer, dirName);

    if(fs.existsSync(this.workingDirectoryPath) == false) {

        fs.mkdirSync(this.workingDirectoryPath);

    }

    process.chdir(this.workingDirectoryPath);

};

/***
 * Create sub directory and change to it.
 * @param dirName       sub directory name
 * @returns {boolean}   if create success
 */
TestUtil.prototype.createAndChangeToSubDirectory = function(dirName) {

    this.subDirectoryPath = path.join(this.workingDirectoryPath, dirName);

    if(fs.existsSync(this.workingDirectoryPath)) {

        if(fs.existsSync(this.subDirectoryPath) == false) {

            fs.mkdirSync(this.subDirectoryPath);
            process.chdir(this.subDirectoryPath);
            return true;

        }

    } else {

        // working directory not exists, return false.
        return false;

    }

}

TestUtil.prototype.cleanWorkingDirectory = function () {

    if(fs.existsSync(this.workingDirectoryPath)) {

        rimraf.sync(this.workingDirectoryPath);

    }

};

TestUtil.prototype.loadSupportFile = function (name) {

    let filePath = path.join(this.testPreloadContainer, name);
    return fs.readFileSync(filePath);

};

TestUtil.prototype.getSupportFilePath = function (name) {

    return path.join(this.testPreloadContainer, name);

};

module.exports = new TestUtil();