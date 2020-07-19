import React from 'react';
import ReactDOM from 'react-dom';
import styles from './index.module.less';

function TodoList() {
  return (
    <div className={styles.test}>
      <h1>Hello, world!</h1>
    </div>
  );
}

ReactDOM.render(<TodoList />, document.getElementById('root'));
