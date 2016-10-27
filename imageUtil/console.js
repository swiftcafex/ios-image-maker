/*jshint node: true, bitwise:true, curly:true, forin:true, noarg:true, noempty:true, nonew:true, undef:true, strict:true, browser:true, node:true, asi:false, es5: true, evil: true, nomen: true */
'use strict';

//命令行输出
function Console() {

}

Console.prototype.log = function(message) {
	
	console.log(message);

};

module.exports = new Console();