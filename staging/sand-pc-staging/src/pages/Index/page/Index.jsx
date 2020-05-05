import React from '@jianghe/sand-core/react';
import { NavLink } from '@jianghe/sand-core/router';

class Index extends React.PureComponent {
  render() {
    return (
      <div>
        <h1>首页</h1>
        <NavLink to="/book/apple">去Apple页</NavLink>
        <br />
        <NavLink to="/book/store">去Store页</NavLink>
      </div>
    );
  }
}

export default Index;
