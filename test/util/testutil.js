var fs = require("fs");
var path = require("path");

function TestUtil() {

    this.workingDIR = "";

}

TestUtil.prototype.bindWorkingDIR = function (dirName) {

    this.workingDIR = path.join(__dirname, "../", dirName);

}

TestUtil.prototype.createAndChangeToWorkingDIR = function () {

    console.log("exists dir: " + this.workingDIR);
    if(fs.existsSync(this.workingDIR) == false) {

        fs.mkdirSync(this.workingDIR);

    }

    process.chdir(this.workingDIR);

};

TestUtil.prototype.cleanWorkingDIR = function () {

    if(fs.existsSync(this.workingDIR)) {

        fs.rmdirSync(this.workingDIR);

    }

};

module.exports = new TestUtil();