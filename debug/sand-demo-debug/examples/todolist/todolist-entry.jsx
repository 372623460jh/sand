import React from '@jianghe/sand-core/react';
import ReactDOM from '@jianghe/sand-core/react-dom';
import styles from './index.module.less';

class TodoList extends React.PureComponent {
  render() {
    return (
      <div className={styles.test}>
        <h1>Hello, world!</h1>
      </div>
    );
  }
}

ReactDOM.render(<TodoList />, document.getElementById('root'));
