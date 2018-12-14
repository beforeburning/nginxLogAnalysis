/**
 User: burning <923398776@qq.com>
 Date: 2018年12月13日
 */
//解压文件
const decompress = require('decompress');

function unpack (path, callback) {
  let unpackFun = [],
    arr = [];

  // 为每个文件创建解压方法
  path.forEach(path => unpackFun.push(decompress(path, 'dist', {
    map: file => {
      return file;
    }
  })));

  // 同步解压所有文件 拿到所有的日志文件
  Promise.all(unpackFun).then(res => {
    res.forEach(res => {
      let buf = new Buffer(res[0].data).toString(),
        str = {
          domain: res[0].path,
          log: buf
        };
      arr.push(str);
    });
    console.log('-----完成解压文件-----');
    callback(arr)
  })

  // path.forEach((val, index) => {
  //   //循环终止 批量执行创建的所有Promise对象
  //   if (index === path.length - 1) {
  //     Promise.all(unpackFun).then((res) => {
  //       callback(res)
  //     })
  //   }
  //   // 创建Promise对象
  //   let fun = new Promise((resolve) => {
  //     decompress(val, 'dist', {
  //       map: file => {
  //         return file;
  //       }
  //     }).then(files => {
  //       if (files[0]) {
  //         let buf = new Buffer(files[0].data).toString(),
  //           str = {
  //             domain: files[0].path,
  //             log: buf
  //           };
  //         resolve(str)
  //       }
  //     });
  //   });
  //   unpackFun.push(fun)
  // });
}

module.exports = {
  unpack
};
