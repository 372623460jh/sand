import React from 'react';
import { NavLink } from '@jianghe/sand-core/router-dom';
import { Breadcrumb } from 'antd';

class Store extends React.PureComponent {
  render() {
    return (
      <div>
        <Breadcrumb>
          <Breadcrumb.Item>
            <NavLink to="/spa">首页</NavLink>
          </Breadcrumb.Item>
          <Breadcrumb.Item>Store</Breadcrumb.Item>
        </Breadcrumb>
        <h1>Store</h1>
      </div>
    );
  }
}

export default Store;
