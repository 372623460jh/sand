/**
 * encode Html
 * @param {*} htmlString
 */
function encodeHtml(htmlString: string): string {
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
function decodeHtml(htmlString: string): string {
  const temp = document.createElement('div');
  temp.innerHTML = htmlString;
  return temp.innerText || temp.textContent;
}

export { encodeHtml, decodeHtml };
