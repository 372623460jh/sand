import React from 'react';
import ReactDOM from 'react-dom';
import styles from './index.module.less';

// @ts-ignore
__TEST_VARIABLE__;

class Fish extends React.PureComponent {
  render() {
    return (
      <div className={styles.test}>
        <h1>fish</h1>
      </div>
    );
  }
}

ReactDOM.render(<Fish />, document.getElementById('root'));
