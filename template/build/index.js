var process = require("child_process");
var chokidar = require("chokidar");
var config = require("./config.js");
var utils = require("./utils.js");

/**
 * @desc 编译less函数
 * @fn 建立命令行，编译less文件为wxss文件
 **/
function compileLess(filepath){
  process.exec("lessc "+filepath+" "+filepath.replace(".less",".wxss"));
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
