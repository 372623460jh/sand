import React, { useState } from '@jianghe/sand-core/react';
import PropTypes from '@jianghe/sand-core/prop-types';
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
    setSence(2222222);
  };

  return (
    <div className={styles.testModule}>
      <div className="test">testcss</div>
      <Button onClick={onSenceChange}>test</Button>
      <span>{sence}</span>
    </div>
  );
}

AnyOne.propTypes = {
  source: PropTypes.string.isRequired,
};

export default AnyOne;
