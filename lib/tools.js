var fs = require('fs');
var pathlib = require("path");

let filePaths = []

// 复制文件夹
async function readDirSync(constantSourceDir, distDir, sourceDir) {
  let filePathArr = fs.readdirSync(sourceDir);
  filePathArr.forEach(async function (filename) {
    let info = fs.statSync(pathlib.join(sourceDir, filename))
    let sourcePath = pathlib.join(sourceDir, filename)
    let distPath = sourcePath.replace(constantSourceDir, distDir)
    if (info.isDirectory()) {
      fs.mkdirSync(distPath)
      await readDirSync(constantSourceDir, distDir, sourcePath);
    } else {
      filePaths.push({sourcePath: sourcePath, distPath: distPath})
    }
  })
}

// 复制文件
exports.copyFile = async function (constantSourceDir, distDir, sourceDir, callBack) {
  filePaths = []
  await readDirSync(constantSourceDir, distDir, sourceDir)
  let copyNum = 0
  for (let i = 0; i < filePaths.length; i++) {
    let readable = fs.createReadStream(filePaths[i].sourcePath);//创建读取流
    let writable = fs.createWriteStream(filePaths[i].distPath);//创建写入流
    await readable.pipe(writable);
    readable.on('end', () => {
      copyNum++
      if (filePaths.length === copyNum) {
        callBack()
      }
    });
  }
}
