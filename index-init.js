var doInit = require("./func/init.func");
const chalk = require('chalk');

doInit(function(){

    console.log(chalk.green("Config file " + configPath + " created."));

});