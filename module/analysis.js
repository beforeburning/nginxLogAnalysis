/**
 User: burning <923398776@qq.com>
 Date: 2018年12月14日
 */

const fs = require('fs');
const path = require('path');

// 判断数据中存在次数
const countFun = (arr, value) => arr.reduce((a, v) => v === value ? a + 1 : a + 0, 0);

function analysis (res) {

  res.forEach((val, index) => {
    if (index === res.length - 1) {
      console.log('-----日志分析结束-----');
    }

    let title = val.domain,
      log = val.log.split(/[\n]/),
      stateArr = [],
      path = `${ process.cwd() }/nginxLogAnalysis/data/${ title }.txt`;

    log.forEach((line, index) => {
      if (index === log.length - 1) {
        let s = new Set(stateArr);
        s.forEach((ele) => {
          let count = countFun(stateArr, ele),
            results = `${ ele } => ${ count } \n`;
          fs.writeFile(path, results, {'flag': 'a'}, (err) => {
            if (err) throw err
          });
        });
      }
      if (line) {
        // 开始分割数据  根据具体日志文件修改切割数据方式 此为nginx日志
        let arr = line.split('"'),
          ipArr = arr[0].split(' - - '),
          // ip
          ip = ipArr[0],
          // 请求时间
          time = ipArr[1],
          // 请求参数
          post = arr[1],
          // 状态码
          state = arr[2].split(' ')[1],
          // ua
          ua = arr[5],
          // 相应时间
          corresponding = arr[8];

        stateArr.push(state)
      }
    })
  })

}

module.exports = {
  analysis
};
