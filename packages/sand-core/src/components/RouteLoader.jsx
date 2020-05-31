import React from 'react';
import PropTypes from 'prop-types';
import { renderRoutes } from 'react-router-config';
import { withRouter, Route } from 'react-router-dom';

/**
 * Router下的Route组件
 */
class RouteLoader extends React.PureComponent {
  static propTypes = {
    routes: PropTypes.array.isRequired,
    // Router下会注入location
    location: PropTypes.object.isRequired,
  }

  render() {
    const { location, routes } = this.props;

    // Route是路由的一个原材料，它是控制路径对应显示的组件。
    // renderRoutes(routes)调用了eact-router-config的renderRoutes方法根据路由配置渲染出了路由组件
    // 通过Route.render渲染出该生成的组件
    return (
      <Route
        location={location}
        render={() => renderRoutes(routes)}
      />
    );
  }
}

export default withRouter(RouteLoader);
