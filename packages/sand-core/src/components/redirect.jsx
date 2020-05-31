import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Redirect } from 'react-router-dom';
import { locationsAreEqual } from 'history';

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
  return class RedirectWrapper extends Component {
    static propTypes = {
      location: PropTypes.object.isRequired,
    }

    /**
     * 是否需要更新组件生命周期
     * @param {*} nextProps
     */
    shouldComponentUpdate(nextProps) {
      const { location } = this.props;
      // location没变时不需要重新渲染界面
      return !locationsAreEqual(nextProps.location, location);
    }

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
