var Config = require("./config");
var imageutil = require("./imageutil");

let config = new Config();
config.loadConfig();
// config.init().then(function(configList){
//
// 	configList.forEach(function(item){
//
// 		imageutil.generate(item);
//
// 	});
//
// });