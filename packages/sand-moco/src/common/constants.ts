/**
 * 页面类型枚举
 * normal正常页
 * temp临时页
 */
const PAGE_ENUM = {
  NORMAL: 'normal',
  TEPM: 'temp',
};

/**
 * 跳页类型
 * init 初始化
 * go 前进
 * goBack 后退
 */
const JUMP_METHOD_ENUM = {
  INIT: 'init',
  GO: 'go',
  GO_BACK: 'goBack',
};

/**
 * 根节点
 */
let ROOT_ELE = '#sand-root';
const setRootEle = (id: string): void => {
  ROOT_ELE = id;
};
const getRootEle = (): string => {
  return ROOT_ELE;
};

/**
 * 页面根节点类名
 */
const PAGE_ROOT_ELE = 'sand-main-box';

/**
 * 页面生命周期枚举
 */
const LIFE_CYCLE = {
  onCreate: 'onCreate',
  onPause: 'onPause',
  onResume: 'onResume',
  onDestroy: 'onDestroy',
};

const CONSTANTS = {
  PAGE_ENUM,
  JUMP_METHOD_ENUM,
  LIFE_CYCLE,
  PAGE_ROOT_ELE,
  setRootEle,
  getRootEle,
};

export default CONSTANTS;
