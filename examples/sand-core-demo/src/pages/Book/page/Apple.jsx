import React from '@jianghe/sand-core/react';
import { NavLink } from '@jianghe/sand-core/router-dom';
import { Breadcrumb } from 'antd';

class Apple extends React.PureComponent {
  render() {
    return (
      <div style={{ height: 2000 }}>
        <Breadcrumb>
          <Breadcrumb.Item>
            <NavLink to="/spa">首页</NavLink>
          </Breadcrumb.Item>
          <Breadcrumb.Item>Apple</Breadcrumb.Item>
        </Breadcrumb>
        <h1>Apple</h1>
      </div>
    );
  }
}

export default Apple;
