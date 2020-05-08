import React from '@jianghe/sand-core/react';
import ReactDOM from '@jianghe/sand-core/react-dom';
import styles from './index.module.less';

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
