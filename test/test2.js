var fs = require("fs")
var path = require("path");
let buffer= fs.readFileSync('D:\\Space_test\\xxx\\project.config.json')
console.log('buffer', buffer)
let config = JSON.parse(String(buffer));
config.appid = appId

console.log(config)
