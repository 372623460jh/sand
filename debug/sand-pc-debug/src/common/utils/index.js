/**
 * 获取url上参数
 * @param {*} key 参数key
 */
function getQueryValue(key) {
  const query = window.location.search.substring(1);
  const vars = query.split('&');
  for (let i = 0; i < vars.length; i++) {
    const pair = vars[i].split('=');
    if (pair[0] === key) {
      return pair[1];
    }
  }
  return false;
}

export { getQueryValue };
