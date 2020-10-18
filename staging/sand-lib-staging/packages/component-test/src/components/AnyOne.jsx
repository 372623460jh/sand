/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
/* eslint-disable react/prop-types */
import React, { useState } from 'react';
import { Button } from 'antd';
import sayHello from '@/utils/sayHello';
import styles from './AnyOne.module.less';
import './index.less';

function AnyOne(props) {
  const { source } = props;

  sayHello();

  // 控制渠道点击
  const [sence, setSence] = useState(source);
  // eslint-disable-next-line no-unused-vars
  const onSenceChange = (e) => {
    setSence(22222);
  };

  return (
    <div className={styles.testModule}>
      <div className="test">testcss</div>
      <Button type="primary" onClick={onSenceChange}>
        Primary
      </Button>
      <span>{sence}</span>
    </div>
  );
}

export default AnyOne;
