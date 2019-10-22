var fs = require("fs")
var pathlib = require("path")

var root = pathlib.join(__dirname, '../template')
var dist = pathlib.join(__dirname, 'dist')

readDirSync(root, dist, root)

function readDirSync(constantSourceDir, distDir, sourceDir) {
  let filePathArr = fs.readdirSync(sourceDir);
  filePathArr.forEach(function (filename) {
    let info = fs.statSync(pathlib.join(sourceDir, filename))
    let sourcePath = pathlib.join(sourceDir, filename)
    let distPath = sourcePath.replace(root, dist)
    if (info.isDirectory()) {
      fs.mkdirSync(distPath)
      readDirSync(constantSourceDir, distDir, sourcePath);
    } else {
      let readable = fs.createReadStream(sourcePath);//创建读取流
      let writable = fs.createWriteStream(distPath);//创建写入流
      readable.pipe(writable);
    }
  })
}
