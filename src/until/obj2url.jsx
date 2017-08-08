function obj2url(xparam, encode) {
  let param = xparam;
  if (param == null) return '';
  param = encode ? encodeURIComponent(param) : param;
  const paramStr = Object.keys(param).map(item => `&${item}=${param[item]}`).join('');
  return `?${paramStr.substr(1)}`;
}

export default obj2url;
