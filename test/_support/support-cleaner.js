
var fs = require("fs.extra");

function SupportCleaner() {



}

SupportCleaner.prototype.cleanSupportDir = function(dirList) {

    var promiseList = [];

    dirList.forEach(function (item) {

        var promise = new Promise(function(resolve){

            process.chdir(item["cwd"]);
            fs.removeSync(item["dir"]);
            resolve();

        });

        promiseList.push(promise);

    });

    return Promise.all(promiseList);

};

module.exports = new SupportCleaner();