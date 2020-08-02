/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
import React from '@jianghe/sand-core/react';
import { NavLink } from '@jianghe/sand-core/router-dom';
import styles from './index.module.less';

class Index extends React.PureComponent {
  render() {
    return (
      <div className={styles.indexBox}>
        <h1 className={styles.title}>sand-pc 首页</h1>
        <NavLink className={styles.link} to="/aaa">
          /aaa
        </NavLink>
        <NavLink className={styles.link} to="/spa">
          /spa
        </NavLink>
        <NavLink className={styles.link} to="/spa/aaa">
          /spa/aaa
        </NavLink>
        <NavLink className={styles.link} to="/spa/book/apple">
          /spa/book/apple
        </NavLink>
        <NavLink className={styles.link} to="/spa/book/store">
          /spa/book/store
        </NavLink>
        <NavLink className={styles.link} to="/spa/book/aaa">
          /spa/book/aaa
        </NavLink>
        <NavLink className={styles.link} to="/spa/attention/index">
          /spa/attention/index
        </NavLink>
        <NavLink className={styles.link} to="/spa/attention/aaa">
          /spa/attention/aaa
        </NavLink>
        <NavLink className={styles.link} to="/spa/attention/index/aaa">
          /spa/attention/index/aaa
        </NavLink>
      </div>
    );
  }
}

export default Index;
