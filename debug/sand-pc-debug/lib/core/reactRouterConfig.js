const reactRouter = require('react-router-dom');

// 引入es6规范的default模块
function _interopDefault(ex) {
  return (ex && (typeof ex === 'object') && 'default' in ex) ? ex.default : ex;
}

const React = _interopDefault(require('react'));

/**
 * Object.assign的兼容写法:将多个对象字面量合并到一个中,重复属性不覆盖。
 */
function _extends(...arg) {
  const ext = Object.assign || function(target) {
    for (let i = 1; i < arg.length; i++) {
      const source = arg[i];
      Object.keys(source).forEach((key) => {
        if (Object.prototype.hasOwnProperty.call(source, key)) {
          target[key] = source[key];
        }
      });
    }
    return target;
  };
  return ext.apply(this, arg);
}

/**
 * renderRoutes遍历routes的一级子路由，创建<Route>组件，外部用<Switch>组件包裹
 * 该方法的作用是使用配置文件生成路由组件如
 * [{
 *    path: '/',
 *    exact: true,
 *    components: Index
 *  },{
 *    path: '/test1',
 *    components: Test1
 *  },{
 *    path: '/test2',
 *    components: Test2
 * }]
 * 会被转换为
 * <Switch>
 *  <Route path="/" exact render={() => <Index/>} />
 *  <Route path="/test1" render={() => <Test1/>} />
 *  <Route path="/test2" render={() => <Test2/>} />
 * </Switch>
 * {
 *   redirect: {
 *     to: '' // 
 *   },
 *   key:
 * }
 * 
 * @param {*} routes        路由配置
 * @param {*} extraProps    子组件属性
 * @param {*} switchProps   包裹子组件的Switch组件的属性
 */
function renderRoutes(routes, extraProps, switchProps) {
  // 没有参数的话初始为空对象
  if (extraProps === undefined) {
    extraProps = {};
  }
  if (switchProps === undefined) {
    switchProps = {};
  }

  if (routes) {
    // 遍历该一级下的所有子路由
    const children = routes.map((route, i) => {
      let ele = null;
      if (route.redirect) {
        // 如果是重定向
        ele = React.createElement(reactRouter.Redirect, {
          key: route.key || i, // key
          from: route.path || '', // 路由全路径
          exact: route.exact, // 是否完全匹配
          to: route.redirect.to, // 跳转路径
        });
      } else {
        // 非重定向
        ele = React.createElement(reactRouter.Route, {
          key: route.key || i, //
          path: route.path, // 路由全路径
          exact: route.exact, // 是否完全匹配
          strict: route.strict, // 如果path以/结尾的，忽略/后内容
          render: function render(props) {
            if (route.render) {
              // 如果有render方法 执行配置中的render方法生成相应组件
              return route.render(_extends({}, props, extraProps, {
                route,
              }));
            }
            // 没有render方法 使用component属性对应的组件去渲染
            return React.createElement(
              route.component,
              _extends({}, props, extraProps, {
                route,
              }),
            );
          },
        });
      }
      return ele;
    });
    // 外部包裹一层Switch组件
    return React.createElement(reactRouter.Switch, switchProps, children);
  }
  return null;
}

function matchRoutes(routes, pathname, branch) {
  if (branch === undefined) {
    branch = [];
  }
  routes.some((route) => {
    const match = route.path ? reactRouter.matchPath(pathname, route) :
      (branch.length ?
        branch[branch.length - 1].match :
        reactRouter.Router.computeRootMatch(pathname));
    if (match) {
      branch.push({
        route,
        match,
      });
      if (route.routes) {
        matchRoutes(route.routes, pathname, branch);
      }
    }
    return match;
  });
  return branch;
}


/**
 * 该方法用于将分割的路由配置汇总
 * @param {*} route 路由配置
 */
function sumRouter(route = []) {
  // 引入pages下所有的router-config.js文件，
  // 第一个参数是相对路径
  // 第二个参数是是否包含子目录
  // 第三个参数是匹配文件的正则
  const subRouteConfig = require.context('../../src/pages', true, /router-config\.js$/);

  // subRouteConfig.keys()返回的是按照条件匹配到的路径数组
  subRouteConfig.keys().forEach((key) => {
    let config = subRouteConfig(key);
    // 取出拆分的路由配置
    config = config.default || config;
    // 将布局字段改成component
    config.component = config.layout;
    // 合并到主路由中
    route.push(config);
  });
  return route;
}

export {
  matchRoutes,
  renderRoutes,
  sumRouter,
};
