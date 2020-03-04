// 判断是不是数组
function isArray(arr) {
  return Object.prototype.toString.call(arr) === '[object Array]';
}

// 判断是不是数组
function isObject(obj) {
  return Object.prototype.toString.call(obj) === '[object Object]';
}

module.exports = {
  isArray,
  isObject,
};
