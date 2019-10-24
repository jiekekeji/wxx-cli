var process = require("child_process");
var chokidar = require("chokidar");
var config = require("./config.js");
var utils = require("./utils.js");
var pathlib = require("path");
var fs = require('fs');

let filePaths = []

/**
 * 启动项目后先编译一遍
 * @param sourceDir
 * @returns {Promise<void>}
 */
async function readDirSync(sourceDir) {
  if (sourceDir.indexOf('node_modules') !== -1) {
    return
  }
  let filePathArr = fs.readdirSync(sourceDir);
  filePathArr.forEach(async function (filename) {
    let info = fs.statSync(pathlib.join(sourceDir, filename))
    let sourcePath = pathlib.join(sourceDir, filename)
    if (info.isDirectory()) {
      await readDirSync(sourcePath);
    } else if (sourcePath.substring(sourcePath.length - 4, sourcePath.length) === 'less') {
      filePaths.push(sourcePath)
    }
  })
}

/**
 * @desc 编译less函数
 * @fn 建立命令行，编译less文件为wxss文件
 **/
function compileLess(filepath) {
  console.log(filepath)
  process.exec("lessc " + filepath + " " + filepath.replace(".less", ".wxss"));
}

/**
 * @desc 文件夹监听
 **/
var ready = false;

// 文件新增时 若文件为less文件 则将其编译为wxss文件至其所在目录
function addFileListener(path_) {
  if (ready) {
    var isLess = utils.isLessFile(path_);
    if (isLess) {
      compileLess(path_);
    }
    console.log("File", path_, "has been added");
  }
}

/**
 * @desc 增加目录时的回调函数
 **/
function addDirecotryListener(path) {
  if (ready) {
    console.log("Directory", path, "has been added");
  }
}

/**
 * @desc 文件内容改变时的回调函数
 * @fn 判断是否为less文件，若是则编译文件为wxss
 **/
function fileChangeListener(path_) {
  var isLess = utils.isLessFile(path_);
  if (isLess) {
    compileLess(path_);
  }
  console.log("File", path_, "has been changed");
}

/**
 * @desc 删除文件时的回调函数
 **/
function fileRemovedListener(path_) {
  console.log("File", path_, "has been removed");
}

/**
 * @desc 删除目录时的回调函数
 **/
function directoryRemovedListener(path) {
  console.log("Directory", path, "has been removed");
}

/**
 * @desc 建立监听任务
 **/
function initCompileWork() {
  var watcher = chokidar.watch(config.src);
  watcher
  .on("add", addFileListener)
  .on("addDir", addDirecotryListener)
  .on("change", fileChangeListener)
  .on("unlink", fileRemovedListener)
  .on("unlinkDir", directoryRemovedListener)
  .on("error", function (error) {
    console.log("Error happened", error);
  })
  .on("ready", function () {
    console.log(">>>less文件监听已开启<<<");
    ready = true;
  });
}

async function startCompileLessFie(distDir) {
  filePaths = []
  await readDirSync(distDir)
  for (let i = 0; i < filePaths.length; i++) {
    compileLess(filePaths[i])
  }
  initCompileWork()
}

startCompileLessFie(pathlib.resolve(__dirname, '..'))
