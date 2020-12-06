let url = 'http://top.baidu.com/buzz?b=26&c=1&fr=topcategory_c1';
let request = require('request');
let iconv = require('iconv-lite');
let cheerio = require('cheerio');
// request 默认会使用 utf-8 把 buffer 转为字符串, 但是不支持 GBK
//告诉request我不需要你帮我把响应体的buffer二进制转成字符串
request({ url, encoding: null }, function (err, response, body) {
  // 把一个GBK的buffer转成一个utf8字符串
  body = iconv.decode(body, 'gbk');
  let $ = cheerio.load(body);
  let movies = [];
  $('a.list-title').each(function (index, item) {
    movies.push({
      title: $(this).text(),
    });
  });
  console.log(movies);
  //   console.log(body);
});

// 怎么确认网页需不需要转码？
// 看 meta字段 charset=gb2312 的需要转， 一般老的网站还是gbk, 新的基本上都是 utf-8
