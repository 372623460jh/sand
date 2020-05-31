import React from 'react';
import { renderRoutes } from 'react-router-config';
import PropTypes from 'prop-types';

/**
 * 用于包装每一个路由对应组件的HOC组件
 * @param {*} Component
 */
const WrapBaseComponent = (Component) => {
  class BaseComponentWrapper extends React.PureComponent {
    static propTypes = {
      route: PropTypes.object,
    };

    static defaultProps = {
      route: undefined,
    };

    render() {
      const { route } = this.props;

      // 通过renderRoutes渲染该Component下对应的子路由
      // this.props.route是对应路由的子路由
      return (
        <Component route={route}>
          {renderRoutes(route.routes)}
        </Component>
      );
    }
  }

  return BaseComponentWrapper;
};

export default WrapBaseComponent;
