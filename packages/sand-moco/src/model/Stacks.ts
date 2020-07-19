/* eslint-disable @typescript-eslint/no-explicit-any */
import Page from './Page';
// import { PAGE_ENUM } from '../common/config';

/**
 * 页面栈类
 */
class Stacks {
  // 页面集合
  public pageMap: any = {};

  // 当前显示的页面队列
  public pageFlag: string[] = [];

  constructor() {
    this.pageMap = {};
    this.pageFlag = [];
  }

  /**
   * 页面入栈的方法
   * @param page 页面实例
   */
  push(page: Page): void {
    this.pageFlag.push(page.pageId);
    this.pageMap[page.pageId] = page;
  }

  /**
   * 页面出栈的方法
   */
  pop(): Page {
    return this.pageMap[this.pageFlag.pop()];
  }

  /**
   * 移除栈中指定的pageId
   */
  removeStacks(page: Page): boolean {
    const flagIndex = this.pageExist(page);
    if (flagIndex >= 0) {
      this.pageFlag.splice(flagIndex, 1);
      return true;
    }
    return false;
  }

  /**
   * 查询栈中是否存在page对象
   * @param page page对象
   * @return this.pageFlag的下标（-1为没找到）
   */
  pageExist(page: Page): number {
    for (let i = 0; i < this.pageFlag.length; i++) {
      if (this.pageFlag[i] === page.pageId) {
        return i;
      }
    }
    return -1;
  }

  // /**
  //  * 执行goBack时根据goBack的入参返回待返回页的pageId,如果未找到符合条件的返回页返回false
  //  */
  // findPageId(obj): string | boolean {
  //   const { pagePath, pageKey } = obj;
  //   if (pagePath) {
  //     /**
  //      * 传入了pagePath，返回距离栈顶最近的满足pagePath,pageKey的页面
  //      */
  //     for (let n = this.pageFlag.length - 2; n >= 0; n--) {
  //       const pg = this.getPage(n);
  //       if (
  //         pg &&
  //         pg.pagePath === pagePath &&
  //         (!pageKey || pg.pageKey === pageKey)
  //       ) {
  //         // 找到离栈顶最近的正常页
  //         return pg.pageId;
  //       }
  //     }
  //   } else {
  //     /**
  //      * 未传入pagePath
  //      */
  //     // 获取栈顶页
  //     const topPage = this.getPage(-1);
  //     if (topPage && topPage.pageType === PAGE_ENUM.NORMAL) {
  //       // 栈顶页是正常页返回
  //       for (let n = this.pageFlag.length - 2; n >= 0; n--) {
  //         const pg = this.getPage(n);
  //         if (pg && pg.pageType === PAGE_ENUM.NORMAL) {
  //           // 找到离栈顶最近的正常页
  //           return pg.pageId;
  //         }
  //       }
  //     } else if (topPage && topPage.pageType === 'temp') {
  //       // 栈顶页是临时页返回
  //       const tempPage = this.getPage(-2);
  //       if (tempPage) {
  //         return tempPage.pageId;
  //       }
  //     }
  //   }
  //   console.warn('返回页面不存在');
  //   return false;
  // }

  /**
   * 获取栈中的page对象
   * @param index 索引值如果为+是数组下标，如果为-是倒数
   * @return {*}
   */
  getPage(index: number): Page | false {
    if (this.pageFlag.length === 0) {
      return false;
    }
    const n = index % this.pageFlag.length;
    if (n < 0) {
      return this.pageMap[this.pageFlag[this.pageFlag.length + n]];
    } else {
      return this.pageMap[this.pageFlag[n]];
    }
  }

  // /**
  //  * 从栈中倒数第二个page开始查询返回第一个进栈的page
  //  * @return {*}
  //  */
  // getInstackPage(): Page {
  //   let lastFlag: number = this.pageFlag.length - 2;
  //   let lastInstackPage: Page = null;
  //   for (lastFlag; lastFlag >= 0; lastFlag--) {
  //     const temPage = this.pageMap[this.pageFlag[lastFlag]];
  //     if (temPage.notinstack === false) {
  //       lastInstackPage = temPage;
  //       break;
  //     }
  //   }
  //   return lastInstackPage;
  // }
}

export default Stacks;
