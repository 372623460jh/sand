import React from 'react';
import { Redirect } from 'react-router-dom';

/**
 * 用于重定向的HOC
 * @param {*} param0
 */
function redirect({
  to, // 重定向到哪
  push,
  exact, // 是否精确匹配时才重定向
  strict,
  from,
}) {
  return class RedirectWrapper extends React.PureComponent {
    // push 当为true时将push一个新的实体到历史中代替当前
    // exact 是否完全匹配
    // to: route.redirect.to 跳转路径
    // from: route.path || '' 路由全路径
    render() {
      // 修复react-router 4.4下 to不是object导致的无限onUpdate问题
      const realTo = typeof to === 'string' ? {
        pathname: to,
        search: '',
        hash: '',
      } : to;

      return (
        <Redirect
          from={from}
          to={realTo}
          push={push}
          exact={exact}
          strict={strict}
        />
      );
    }
  };
}

export default redirect;
