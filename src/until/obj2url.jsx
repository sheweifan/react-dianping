const obj2url = function (param, encode) {
  if (param == null) return '';
  let paramStr = '';
  // var t = typeof (param);
  // if (t == 'string' || t == 'number' || t == 'boolean') {
  //   paramStr += '&' + key + '=' + ((encode==null||encode) ? encodeURIComponent(param) : param);
  // } else {
  //   for (var i in param) {
  //     var k = key == null ? i : key + (param instanceof Array ? '[' + i + ']' : '.' + i);
  //     paramStr += obj2url(param[i], k, encode);
  //   }
  // }
  // return paramStr;
  param = encode ? encodeURIComponent(param) : param;
  for (const i in param) {
    paramStr += `&${i}=${param[i]}`;
  }

  paramStr = `?${paramStr.substr(1)}`;
  return paramStr;
};


export default obj2url;
