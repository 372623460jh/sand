import { getRandom } from '../common/utils';
import CONSTANTS from '../common/constants';
import { getPageDom } from '../render/renderPage';
import getMoco, { Moco } from './Moco';

const { PAGE_ENUM, LIFE_CYCLE } = CONSTANTS;

/**
 * 实例化page时的参数
 */
interface pageConfig {
  // 页面路由
  pagePath: string;
  // 页面对应的react组件
  component: React.ComponentClass<any>;
  // dva状态模型
  model?: any;
  // 页面键值，和页面id的区别是页面id是系统自动生成的，而pagekey是使用者跳转页面是传入的标识页面的key
  pageKey?: string;
  // 页面类型（normal正常页，temp临时页）
  pageType?: string;
}

/**
 * 页面类
 */
class Page {
  // 页面id,保存到路由栈中的标志位
  public pageId = '';

  // 页面路由
  public pagePath = '';

  // 页面键值，和页面id的区别是页面id是系统自动生成的，而pagekey是使用者跳转页面是传入的标识页面的key
  public pageKey = '';

  // 页面类型（normal正常页，temp临时页）
  public pageType = PAGE_ENUM.NORMAL;

  // 页面对应的React组件
  public component: React.ComponentClass<any> = null;

  // 页面对应的真实dom
  public dom: HTMLElement = null;

  // Moco实例
  public moco: Moco = null;

  // dva状态模型
  public model: any = false;

  // 页面传入的监听器hook
  public monitorHook = {
    // 页面创建
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    [LIFE_CYCLE.onCreate]: (_page: Page) => {},
    // 页面挂起
    // eslint-disable-next-line
    [LIFE_CYCLE.onPause]: (_page: Page) => {},
    // 页面重回
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    [LIFE_CYCLE.onResume]: (_page: Page) => {},
    // 页面销毁
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    [LIFE_CYCLE.onDestroy]: (_page: Page) => {},
  };

  constructor(opts: pageConfig) {
    const {
      pagePath,
      component,
      model = false,
      pageKey = '',
      pageType = PAGE_ENUM.NORMAL,
    } = opts;
    this.pagePath = pagePath;
    this.pageKey = pageKey;
    this.pageType = pageType;
    this.component = component;
    this.pageId = `${this.pagePath}${getRandom()}`;

    // 获取moco实例
    this.moco = getMoco();

    // 有dva实例和该页面有对应的dva模型，在页面创建时注册dva模型
    if (this.moco.dvaApp && model) {
      this.model = model;
      this.moco.dvaApp.setModel(this.model);
    }

    // 创建dom
    this.createDom();
  }

  /**
   * 监听器方法
   */
  monitor = (lifeCycleName, hook) => {
    if (LIFE_CYCLE[lifeCycleName]) {
      this.monitorHook[LIFE_CYCLE[lifeCycleName]] = hook;
    } else {
      console.error('生命周期事件名错误');
    }
  };

  /**
   * 页面创建的方法
   */
  onCreate() {
    // 有hook时执行hook
    this.monitorHook[LIFE_CYCLE.onCreate] &&
      this.monitorHook[LIFE_CYCLE.onCreate](this);
  }

  /**
   * 页面暂停，挂起
   */
  onPause() {
    this.monitorHook[LIFE_CYCLE.onPause] &&
      this.monitorHook[LIFE_CYCLE.onPause](this);
  }

  /**
   * 重新回到页面的方法
   */
  onResume() {
    this.monitorHook[LIFE_CYCLE.onResume] &&
      this.monitorHook[LIFE_CYCLE.onResume](this);
  }

  /**
   * 销毁页面的方法
   */
  onDestroy() {
    try {
      if (this.moco) {
        // 移除栈
        this.moco.stacks.removeStacks(this);
        // 移除堆
        this.moco.stacks.pageMap[this.pageId] = '';
        delete this.moco.stacks.pageMap[this.pageId];
      }
    } catch (e) {
      console.error('移除堆区page对象失败');
    }
    this.monitorHook[LIFE_CYCLE.onDestroy] &&
      this.monitorHook[LIFE_CYCLE.onDestroy](this);
  }

  /**
   * 创建dom
   */
  createDom() {
    if (!this.dom) {
      this.dom = getPageDom(this);
    }
  }
}

export default Page;
