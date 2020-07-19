import router from '../router/director';
import getMoco, { Moco } from '../model/Moco';
import CONSTANTS from '../common/constants';

const { setRootEle } = CONSTANTS;

interface routerConfig {
  path: string;
  enable: boolean;
  component: React.ComponentClass<any>;
  model: any;
}

interface listenOpts {
  webpackRouteConfig: __WebpackModuleApi.RequireContext;
  defaultRoute: string;
  rootEle: string;
}

/**
 * 合并路由生成路由配置, 获取路由配置的方法
 * @param webpackRouteConfig webpack读取的路由配置
 */
function getRoutes(
  webpackRouteConfig: __WebpackModuleApi.RequireContext
): routerConfig[] {
  // 子路由
  const routes: routerConfig[] = [];

  // 遍历webpack读取的路由配置
  webpackRouteConfig.keys().forEach((key) => {
    let config = webpackRouteConfig(key);
    // 取出拆分的路由配置
    config = config.default || config;
    // 合并到主路由中
    routes.push(config);
  });

  // 完整路由
  return routes;
}

/**
 * 获取路由配置，并根据路由配置，形成hash监听
 */
function addListen(opts: listenOpts): void {
  const { webpackRouteConfig, defaultRoute, rootEle = '' } = opts;

  // 根据外部入参设置根节点选择器
  if (rootEle) {
    setRootEle(rootEle);
  }

  // 合并pages下的路由
  const routes: routerConfig[] = getRoutes(webpackRouteConfig);

  // 实例化一个moco
  const moco: Moco = getMoco();

  // 根据路由配置生成路由集合
  const routeMap = {};
  for (let index = 0; index < routes.length; index++) {
    const route = routes[index];
    const { component, path, enable = false, model = false } = route;
    if (enable) {
      routeMap[path] = {
        // 当前路由hash值命中前
        before: () => {},
        // 当路由匹配成功时
        on: () => {
          // 匹配路径是调用hitPath
          moco.hitPath({
            pagePath: path,
            component,
            model,
          });
        },
        // 当离开当前注册路径时，需要执行的方法
        after: () => {},
      };
    }
  }

  // 根据路由集合，添加监听
  router(routeMap)
    .configure({
      notfound: () => {
        // 没发现路由时
        console.log('没发现路由');
      },
    })
    .init(defaultRoute || '/');
}

export default addListen;
