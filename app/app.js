/**
 User: burning <923398776@qq.com>
 Date: 2018年12月12日
 */

const fsModule = require('../module/fsModule');
const unpack = require('../module/unpack');
const analysis = require('../module/analysis');

let filePath = __dirname + '/../source';

// 读取文件
fsModule.Subpath(filePath, (path) => {
  console.log('-----开始解压文件-----');
  // 解压文件 把数据放在内存
  unpack.unpack(path, (res) => {
    console.log('-----开始分析日志-----');
    //分析日志
    analysis.analysis(res)
  });
});

