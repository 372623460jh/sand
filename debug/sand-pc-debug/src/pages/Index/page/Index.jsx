import React from '@jianghe/sand-core/react';
import { NavLink } from '@jianghe/sand-core/router-dom';

class Index extends React.PureComponent {
  render() {
    return (
      <div>
        <h1>首页</h1>
        <NavLink to="/aaa">/aaa</NavLink>
        <br />
        <NavLink to="/spa">/spa</NavLink>
        <br />
        <NavLink to="/spa/aaa">/spa/aaa</NavLink>
        <br />
        <NavLink to="/spa/book/apple">/spa/book/apple</NavLink>
        <br />
        <NavLink to="/spa/book/store">/spa/book/store</NavLink>
        <br />
        <NavLink to="/spa/book/aaa">/spa/book/aaa</NavLink>
        <br />
        <NavLink to="/spa/attention/index">/spa/attention/index</NavLink>
        <br />
        <NavLink to="/spa/attention/aaa">/spa/attention/aaa</NavLink>
        <br />
        <NavLink to="/spa/attention/index/aaa">/spa/attention/index/aaa</NavLink>
      </div>
    );
  }
}

export default Index;
