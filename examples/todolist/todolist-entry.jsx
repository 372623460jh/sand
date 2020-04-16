import React from 'react';
import ReactDOM from 'react-dom';
import AnyOne from '@jianghe/component-test/esm/component-test';
import '@jianghe/component-test/esm/component-test.css';
import styles from './index.module.less';

class TodoList extends React.PureComponent {
  render() {
    return (
      <div className={styles.test}>
        <h1>Hello, world!</h1>
        <AnyOne source="11111" />
      </div>
    );
  }
}

ReactDOM.render(<TodoList />, document.getElementById('root'));
