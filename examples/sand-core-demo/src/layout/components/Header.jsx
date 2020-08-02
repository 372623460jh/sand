/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
import React from '@jianghe/sand-core/react';
import { NavLink } from '@jianghe/sand-core/router-dom';
import styles from './layout.module.less';

/**
 * 菜单组件
 */
function HeaderBox() {
  return (
    <div
      className={styles.headerBox}
      style={{ paddingLeft: '50px', lineHeight: '64px' }}
    >
      <span>HeaderBox&nbsp;</span>
      <NavLink to="/spa">&nbsp;返回首页</NavLink>
    </div>
  );
}

export default HeaderBox;
