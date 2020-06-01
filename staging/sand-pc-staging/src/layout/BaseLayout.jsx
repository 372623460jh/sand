import React from '@jianghe/sand-core/react';
import PropTypes from '@jianghe/sand-core/prop-types';
import MenuBox from './components/Menu';
import HeaderBox from './components/Header';
import FooterBox from './components/Footer';
import styles from './BaseLayout.module.less';

/**
 * 基础布局组件
 */
class BaseLayout extends React.PureComponent {
  static propTypes = {
    children: PropTypes.any.isRequired,
  }

  render() {
    const { children } = this.props;
    return (
      <div className={styles.layoutBox}>
        <HeaderBox />
        <div className={styles.centerBox}>
          <MenuBox />
          <div className={styles.contentBox}>
            <div className={styles.subPage}>
              {children}
            </div>
            <FooterBox />
          </div>
        </div>
      </div>
    );
  }
}

export default BaseLayout;
