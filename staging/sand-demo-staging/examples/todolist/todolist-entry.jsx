import React, { useState } from '@jianghe/sand-core/react';
import ReactDOM from '@jianghe/sand-core/react-dom';
import { Button } from 'antd';
import { PlusOutlined } from '@ant-design/icons';
import styles from './index.module.less';

function TodoList() {
  const [count, setCount] = useState(0);

  const add = () => {
    setCount(count + 1);
  };

  return (
    <div className={styles.test}>
      <h1>
        Hello, world! 计数:
        {count}
      </h1>
      <div className={styles.btn}>
        <Button
          type="primary"
          shape="circle"
          onClick={add}
          icon={<PlusOutlined />}
        />
      </div>
    </div>
  );
}

ReactDOM.render(<TodoList />, document.getElementById('root'));
