/* eslint-disable react/prop-types */
import React, { useEffect } from 'react';
import { getMoco, Page } from '@jianghe/sand-moco/es/sand-moco';
import styles from './index.module.less';

const moco = getMoco();

interface appleProps {
  mocoPage: Page;
}

function ApplePage(props: appleProps): JSX.Element {
  useEffect(() => {
    const { mocoPage } = props;
    const { monitor, pagePath } = mocoPage;
    console.log(pagePath, '页面创建');
    monitor('onPause', onPause);
    monitor('onResume', onResume);
    monitor('onDestroy', onDestroy);
  }, []);

  /**
   * 页面暂停，挂起
   */
  const onPause = (page) => {
    console.log(page.pagePath, '页面挂起');
  };

  /**
   * 重新回到页面的方法
   */
  const onResume = (page) => {
    console.log(page.pagePath, '页面重回');
  };

  /**
   * 销毁页面的方法
   */
  const onDestroy = (page) => {
    console.log(page.pagePath, '页面销毁');
  };

  /**
   * back
   */
  const clickGoBack = () => {
    moco.goBack();
  };
  return (
    <div className={styles.applePage}>
      apple page
      <div onClick={clickGoBack}>go back</div>
    </div>
  );
}

export default ApplePage;
