import React from 'react';
import PropTypes from 'prop-types';
// eslint-disable-next-line
import { renderRoutes } from 'he-core';
import LifeHead from './components/LifeHead';
import LifeSubMenu from './components/SubMenu';
import LifeFooter from './components/LifeFooter';
import styles from './lifeLayout.less';

class LifeLayout extends React.PureComponent {
  render() {
    const { route } = this.props;
    return (
      <div>
        <LifeHead />
        <div className={styles.main}>
          <div className={styles.submenu}>
            <LifeSubMenu />
          </div>
          <div className={styles.divider} />
          <div className={styles.content}>
            {renderRoutes(route.routes)}
          </div>
        </div>
        <LifeFooter />
      </div>
    );
  }
}

LifeLayout.propTypes = {
  route: PropTypes.object.isRequired,
};

export default LifeLayout;
