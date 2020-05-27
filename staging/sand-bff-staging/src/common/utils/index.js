/**
 * 获取url上参数
 * @param {*} key 参数key
 */
function getQueryValue(key) {
  const query = window.location.search.substring(1);
  const vars = query.split('&');
  for (let i = 0; i < vars.length; i++) {
    const pair = vars[i].split('=');
    if (pair[0] === key) { return pair[1]; }
  }
  return false;
}

/**
 * encode Html
 * @param {*} htmlString
 */
function encodeHtml(htmlString) {
  const temp = document.createElement('div');
  // 将要转换的字符串设置为这个元素的innerText(ie支持)或者textContent(火狐，google支持)
  if (temp.textContent !== undefined) {
    temp.textContent = htmlString;
  } else {
    temp.innerText = htmlString;
  }
  return temp.innerHTML;
}

/**
 * decode Html
 * @param {*} htmlString
 */
function decodeHtml(htmlString) {
  const temp = document.createElement('div');
  temp.innerHTML = htmlString;
  return temp.innerText || temp.textContent;
}

export {
  getQueryValue,
  encodeHtml,
  decodeHtml,
};
