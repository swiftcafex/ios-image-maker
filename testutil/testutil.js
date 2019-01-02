let fs = require("fs");
let path = require("path");
let rimraf = require("rimraf");

/***
 * Util Class to create separator working dir for every tests.
 * @constructor
 */
function TestUtil() {

    this.workingDirectoryName = "";
    this.workingDirectoryPath = "";

    this.subDirectoryName = "";
    this.subDirectoryPath = "";

}

TestUtil.prototype.bindWorkingDIR = function (dirName) {

    this.workingDirectoryPath = path.join(__dirname, "../", "test/test-support", dirName);

}

/***
 * Create directory belong to specific test in test/test-support folder, and change current working dir to it.
 *
 * @dirName directory name to create and change to.
 *
 */
TestUtil.prototype.createAndChangeToWorkingDirectory = function (dirName) {

    this.workingDirectoryName = dirName;
    this.workingDirectoryPath = path.join(__dirname, "../", "test/test-support", dirName);

    if(fs.existsSync(this.workingDirectoryPath) == false) {

        fs.mkdirSync(this.workingDirectoryPath);

    }

    process.chdir(this.workingDirectoryPath);

};


TestUtil.prototype.createAndChangeToSubDirectory = function(dirName) {

    this.subDirectoryName = dirName;
    this.subDirectoryPath = path.join(this.workingDirectoryPath, dirName);

    if(fs.existsSync(this.workingDirectoryPath)) {

        let subdir = path.join(this.workingDirectoryPath, dirName);

        if(fs.existsSync(this.subDirectoryPath) == false) {

            fs.mkdirSync(subdir);

        }

    } else {

        return false;

    }

}

TestUtil.prototype.cleanWorkingDIR = function () {

    if(fs.existsSync(this.workingDirectoryPath)) {

        rimraf.sync(this.workingDirectoryPath);

    }

};



module.exports = new TestUtil();