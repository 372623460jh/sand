/* eslint-disable import/no-unresolved */
import React, { useState } from '@jianghe/sand-core/react';
import { PropTypes } from '@jianghe/sand-core';
import { Button } from 'antd';
import sayHello from '@/utils/sayHello';
import styles from './AnyOne.module.less';
import './index.less';

function AnyOne(props) {
  const {
    source,
  } = props;

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
      <Button type="primary" onClick={onSenceChange}>Primary</Button>
      <span>{sence}</span>
    </div>
  );
}

AnyOne.propTypes = {
  source: PropTypes.string.isRequired,
};

export default AnyOne;
