/**
 * 内置转场动画
 */
import Page from '../model/Page';
import CONSTANTS from './constants';

const { getRootEle } = CONSTANTS;

/**
 * 首次页面显示的转场动画，直接显示
 * @param showPage 需要显示的页面
 */
function firstShowTransition(showPage: Page): void {
  const rootEle = getRootEle();
  // 获取渲染根节点
  const parentEle = window.document.querySelector(rootEle);
  // 添加到父节点中
  parentEle && parentEle.appendChild(showPage.dom);
}

/**
 * 基础进入转场动画
 * @param hidePage 隐藏的页
 * @param showPage 当前页
 */
function baseInTransition(
  hidePage: Page,
  showPage: Page,
  endCallBack: () => void
): void {
  const rootEle = getRootEle();

  // 要显示页
  const showDom = showPage.dom;

  // 上一页
  const upPageDom = hidePage.dom;

  // 获取根节点
  const parentEle = window.document.querySelector(rootEle);

  showDom.style.display = 'none';
  showDom.style.left = '100%';
  showDom.style.zIndex = '99';
  showDom.style.display = 'block';
  parentEle && parentEle.appendChild(showDom);
  setTimeout(function () {
    showDom.style.transition = 'left 0.4s ease';
    showDom.style.left = '0';
  }, 20);
  setTimeout(function () {
    showDom.style.transition = 'none';
    showDom.style.zIndex = 'none';
    upPageDom.style.display = 'none';
    parentEle && parentEle.removeChild(upPageDom);
    endCallBack();
  }, 600);
}

/**
 * 基础转场动画
 * @param hidePage 隐藏的页
 * @param showPage 当前页
 */
function baseOutTransition(
  hidePage: Page,
  showPage: Page,
  endCallBack: () => void
): void {
  const rootEle = getRootEle();

  // 要显示页
  const showDom = showPage.dom;

  // 上一页
  const upPageDom = hidePage.dom;

  // 获取根节点
  const parentEle = window.document.querySelector(rootEle);

  showDom.style.display = 'none';
  showDom.style.left = '-100%';
  showDom.style.zIndex = '99';
  showDom.style.display = 'block';
  parentEle && parentEle.appendChild(showDom);
  setTimeout(function () {
    showDom.style.transition = 'left 0.4s ease';
    showDom.style.left = '0';
  }, 20);
  setTimeout(function () {
    showDom.style.transition = 'none';
    showDom.style.zIndex = 'none';
    upPageDom.style.display = 'none';
    parentEle && parentEle.removeChild(upPageDom);
    endCallBack();
  }, 600);
}

export { firstShowTransition, baseInTransition, baseOutTransition };
