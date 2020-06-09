import React from '@jianghe/sand-core/react';
import { NavLink } from '@jianghe/sand-core/router-dom';
import { Button } from 'antd';
import { post } from '../../../common/fetch';
import styles from './index.module.less';

class Index extends React.PureComponent {
  /**
   * 登录
   */
  login = () => {
    post('/login.json', { accountName: 'jianghe', password: '112233' });
  };

  /**
   * 测试
   */
  test = () => {
    post('/test.json', {});
  };

  /**
   * 登出
   */
  logout = () => {
    post('/logout.json', {});
  };

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
        <Button onClick={this.login}>登录</Button>
        <Button onClick={this.test}>测试</Button>
        <Button onClick={this.logout}>登出</Button>
      </div>
    );
  }
}

export default Index;
