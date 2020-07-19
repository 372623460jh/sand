/* eslint-disable @typescript-eslint/no-explicit-any */
import Stacks from './Stacks';
import Page from './Page';
import { throttle, isType, obj2url } from '../common/utils';
import CONSTANTS from '../common/constants';
import {
  firstShowTransition,
  baseInTransition,
  baseOutTransition,
} from '../common/transition';
import DvaApp from './Dva';

const { JUMP_METHOD_ENUM, PAGE_ENUM } = CONSTANTS;

interface goOptions {
  pagePath: string;
  args?: any;
  // 页面键值，和页面id的区别是页面id是系统自动生成的，而pagekey是使用者跳转页面是传入的标识页面的key
  pageKey?: string;
  // 页面类型（normal正常页，temp临时页）
  pageType?: string;
  // 转场效果
  transition?: (nowPage: Page, nextPage: Page) => void;
}

interface goBackOptions {
  pagePath?: string;
  args?: any;
  // 页面键值，和页面id的区别是页面id是系统自动生成的，而pagekey是使用者跳转页面是传入的标识页面的key
  pageKey?: string;
  // 页面类型（normal正常页，temp临时页）
  pageType?: string;
  // 转场效果
  transition?: (
    nowPage: Page,
    nextPage: Page,
    transitionEnd: () => void
  ) => void;
}

interface targetPageInfo {
  // 跳页方法go||goback
  jumpMethod: string;
  // 页面url
  pagePath: string;
  // 参数
  args: any;
  // key
  pageKey: string;
  // 页面类型
  pageType: string;
  // 转场动画
  transition: (
    nowPage: Page,
    nextPage: Page,
    transitionEnd: () => void
  ) => void;
}

interface newPageOpts {
  // 页面url
  pagePath: string;
  // 组件
  component: any;
  // 状态模型
  model: any;
}

/**
 * 初始化的目标页信息
 */
const initTargetPageInfo = {
  // 跳页方法go||goback
  jumpMethod: JUMP_METHOD_ENUM.INIT,
  // 页面路由
  pagePath: '',
  // 参数
  args: {},
  // key
  pageKey: '',
  // 页面类型
  pageType: PAGE_ENUM.NORMAL,
  // 转场动画
  transition: baseInTransition,
};

/**
 * Moco类型
 */
class Moco {
  /**
   * 来源页面
   */
  public sourcePage: Page = null;

  /**
   * 页面栈
   */
  public stacks: Stacks = null;

  /**
   * 跳页信息
   */
  private targetPageInfo: targetPageInfo = null;

  /**
   * 在页面跳转中
   */
  private isInJump = false;

  /**
   * dva实例,用于页面之间转态管理
   * https://github.com/dvajs/dva/blob/master/packages/dva-core/src/index.js
   */
  public dvaApp: DvaApp = null;

  constructor() {
    // 创建页面栈
    this.stacks = new Stacks();
    // 初始化目标页面信息
    this.targetPageInfo = initTargetPageInfo;
    // 创建dva实例
    this.dvaApp = new DvaApp();
  }

  /**
   * 命中路由时
   */
  hitPath = (opts: newPageOpts): void => {
    if (this.targetPageInfo.jumpMethod === JUMP_METHOD_ENUM.INIT) {
      // 初始化命中路由
      this.newPage(opts);
    } else if (this.targetPageInfo.jumpMethod === JUMP_METHOD_ENUM.GO) {
      // go跳页命中路由
      this.goPage(opts);
    } else {
      // goBack跳页命中路由
      this.backPage();
    }
  };

  /**
   * 转场动画结束回调
   */
  transitionEnd = (
    hidePage: Page,
    showPage: Page,
    jumpMethod: string
  ): void => {
    if (jumpMethod === JUMP_METHOD_ENUM.GO) {
      // 前进转场动画结束
      // 执行下一个页面创建生命周期和上一个页面的pause生命周期
      hidePage.onPause();
      showPage.onCreate();

      // 重置targetPageInfo
      this.targetPageInfo = initTargetPageInfo;
    }
    if (jumpMethod === JUMP_METHOD_ENUM.GO_BACK) {
      // 返回转场动画结束
      // 执行下一个页面创建生命周期和上一个页面的pause生命周期
      hidePage.onDestroy();
      showPage.onResume();

      // 重置targetPageInfo
      this.targetPageInfo = initTargetPageInfo;
    }
    this.isInJump = false;
  };

  /**
   * 返回页面
   * @param opts 需要显示的页面
   */
  backPage = (): void => {
    if (this.stacks.pageFlag.length > 1) {
      // 取出栈顶页面
      const hidePage = this.stacks.getPage(-1);

      // 取出跳转页面
      const showPage = this.stacks.getPage(-2);

      if (hidePage && showPage) {
        // 在跳页流程中
        this.isInJump = true;

        // 前一个页面
        this.sourcePage = hidePage;

        // 转场动画结束回调
        const endCallBack = () => {
          this.transitionEnd(
            // 隐藏页
            hidePage,
            // 显示页
            showPage,
            // 跳转方式
            this.targetPageInfo.jumpMethod
          );
        };

        // 执行转场动画
        this.targetPageInfo.transition(hidePage, showPage, endCallBack);
      } else {
        console.error('无法取出栈顶页面');
      }
    } else {
      console.error('没有可以返回的页面');
    }
  };

  /**
   * 显示页面
   * @param opts 需要显示的页面
   */
  goPage = (opts: newPageOpts): void => {
    // 页面栈中有几个页
    const len = this.stacks.pageFlag.length;
    if (len > 0) {
      const { component, pagePath, model } = opts;

      // 实例化一个新页面
      const showPage = new Page({
        pagePath,
        component,
        model,
      });

      // 取出栈顶页面
      const hidePage = this.stacks.getPage(-1);

      if (hidePage) {
        // 在跳页流程中
        this.isInJump = true;

        // 前一个页面
        this.sourcePage = hidePage;

        // 不存在栈中 压栈
        this.stacks.push(showPage);

        // 转场动画结束回调
        const endCallBack = () => {
          this.transitionEnd(
            // 隐藏页
            hidePage,
            // 显示页
            showPage,
            // 跳转方式
            this.targetPageInfo.jumpMethod
          );
        };

        // 执行转场动画
        this.targetPageInfo.transition(hidePage, showPage, endCallBack);
      } else {
        console.error('无法取出栈顶页面');
      }
    }
  };

  /**
   * 创建新页(栈中无页面)
   * @param page 页面对象
   */
  newPage = (opts: newPageOpts): void => {
    const { component, pagePath, model } = opts;

    // 实例化一个新页面
    const page = new Page({
      pagePath,
      component,
      model,
    });

    // 将页面入栈
    this.stacks.push(page);

    // 执行默认显示动画
    firstShowTransition(page);

    // 执行页面的生命周期方法
    page.onCreate();

    // 重置targetPageInfo
    this.targetPageInfo = initTargetPageInfo;
  };

  /**
   * 前进的跳转
   * @param obj 跳转对象
   */
  go = throttle((opts: goOptions) => {
    // 在转场动画中 直接return
    if (this.isInJump) return;

    const {
      pagePath,
      args = {},
      pageKey = '',
      pageType = PAGE_ENUM.NORMAL,
      transition = baseInTransition,
    } = opts;
    if (!pagePath) {
      console.error('go方法缺少pagePath参数');
      return;
    }
    if (!isType(args, '[object Object]')) {
      console.error('go方法args参数不合法，只能是[object Object]');
      return;
    }
    // obj转url
    const urlArgs: string = obj2url(args);

    // 记录目标页信息
    this.targetPageInfo = {
      jumpMethod: JUMP_METHOD_ENUM.GO,
      pagePath,
      args,
      pageKey,
      pageType,
      transition,
    };

    // 修改url
    window.location.hash = `#${pagePath}${urlArgs ? `?${urlArgs}` : ''}`;
  }, 300);

  /**
   * 返回的跳转
   * @param obj 跳转对象
   */
  goBack = throttle((opts: goBackOptions = {}) => {
    // 在转场动画中 直接return
    if (this.isInJump) return;

    const {
      // pagePath = '',
      args = {},
      pageKey = '',
      pageType = PAGE_ENUM.NORMAL,
      transition = baseOutTransition,
    } = opts;

    if (!isType(args, '[object Object]')) {
      console.error('go方法args参数不合法，只能是[object Object]');
      return;
    }

    // obj转url
    const urlArgs: string = obj2url(args);

    // 计算出要跳转的页面
    if (this.stacks.pageFlag.length > 1) {
      const backPage = this.stacks.getPage(-2);
      if (backPage) {
        // 记录目标页信息
        this.targetPageInfo = {
          jumpMethod: JUMP_METHOD_ENUM.GO_BACK,
          pagePath: backPage.pagePath,
          args,
          pageKey,
          pageType,
          transition,
        };

        // 修改url
        window.location.hash = `#${backPage.pagePath}${
          urlArgs ? `?${urlArgs}` : ''
        }`;
      }
    } else {
      console.error('没有可以返回的页面');
    }
  }, 300);
}

/**
 * Moco的实例化方法，Moco是单例模式，每个应用只允许存在一个Moco实例
 */
let moco: Moco = null;
function getMoco(): Moco {
  if (!moco) {
    moco = new Moco();
  }
  return moco;
}

export default getMoco;

export { Moco };
