/**
 * @desc 判断文件是否为less文件
 * @params filepath 当前发生改变的文件路径
 * @return Boolean 当前发生改变的文件是否为less文件
 **/
function isLessFile(filepath) {
  //路径为空
  if (filepath === "") {
    return false;
  }
  //路径不含有文件
  if (filepath.indexOf(".") < 0) {
    return false;
  }
  var arr = filepath.split(".");
  var fileExt = arr[arr.length - 1].toLowerCase();
  if (fileExt === "less") {
    return true;
  } else {
    return false;
  }
}


module.exports = {
  isLessFile
};
