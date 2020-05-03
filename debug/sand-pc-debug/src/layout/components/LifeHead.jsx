import React from 'react';
import styles from './lifeHead.less';

class LifeHead extends React.Component {
  componentDidMount() {}

  render() {
    return (
      <div className={styles.headMain}>
        <div className={styles.headContainer}>
          <img src="https://gw.alipayobjects.com/mdn/life_app/afts/img/A*2bmGRIsXEt4AAAAAAAAAAABjARQnAQ" alt="" />
        </div>
      </div>
    );
  }
}

export default LifeHead;
