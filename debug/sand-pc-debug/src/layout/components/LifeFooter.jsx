import React from 'react';
import styles from './lifeFooter.less';

class LifeFooter extends React.PureComponent {
  render() {
    return (
      <div className={styles.footerMain}>
        <div className={styles.footerContainer}>
          <img src="https://gw.alipayobjects.com/mdn/life_app/afts/img/A*JCa7RabvqzUAAAAAAAAAAABjARQnAQ" alt="" />
        </div>
      </div>
    );
  }
}

export default LifeFooter;
