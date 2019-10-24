var fs = require("fs")
var path = require("path");
var tools = require('../lib/tools')

var appId = ''
var mprojectName = ''
var proPath = ''

//更新Appid 读取配置文件 project.config.json
async function copyOK() {
  let buffer = fs.readFileSync(path.join(proPath, 'project.config.json'))
  let config = JSON.parse(String(buffer));
  config.appid = appId
  config.projectname = mprojectName
  let newContent = JSON.stringify(config, null, 4);
  fs.writeFile(path.join(proPath, 'project.config.json'), newContent, 'utf8', (err) => {
    if (err) throw err;
    console.log('Success done');
  });
}

exports.init = async function init(baseDir, projectName, mAppId) {
  appId = mAppId
  mprojectName = projectName
  proPath = path.join(baseDir, projectName)
  let fileStatus = fs.existsSync(proPath)
  if (fileStatus) {
    console.error('projectName is exists')
    return
  }
  console.log('start copy')
  fs.mkdirSync(proPath) // 创建项目文件夹
  let sourcePath = path.join(__dirname, '../template')
  let distPath = proPath
  await tools.copyFile(sourcePath, distPath, sourcePath, copyOK)
};
