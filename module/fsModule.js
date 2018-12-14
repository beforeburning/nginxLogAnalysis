/**
 User: burning <923398776@qq.com>
 Date: 2018年12月13日
 */

const fs = require('fs');
const path = require('path');

// 返回目录下文件
const Subpath = (filePath, callback) => {
  fs.readdir(filePath, (err, files) => {
    if (err) {
      if (err) throw  err;
    } else {
      // 获取文件数量
      let arrLen = files.length - 1,
        arr = [];
      files.forEach((filename, index) => {
        arr.push(path.join(filePath, filename));
        if (arrLen === index) {
          callback(arr);
        }
      });
    }
  });
};

module.exports = {
  Subpath
};
