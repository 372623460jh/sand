/* eslint-disable react/prop-types */
import React, { useEffect } from 'react';
import { getMoco, connect } from '@jianghe/sand-moco/es/sand-moco';
import styles from './index.module.less';

// 获取moco实例
const moco = getMoco();

/**
 * 农场页面
 * @param props
 */
function BookPage(props) {
  const { test = [] } = props;

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
   * 去index
   */
  const clickGoApple = (e) => {
    e.stopPropagation();
    moco.go({
      pagePath: '/apple',
      args: {
        aa: '111',
      },
    });
  };

  /**
   * back
   */
  const clickGoBack = (e) => {
    e.stopPropagation();
    moco.goBack();
  };

  /**
   * 改变状态
   * @param {*} e
   */
  const changeModel = (e) => {
    e.stopPropagation();
    const { dispatch } = props;
    dispatch({
      type: 'jianghe/test/SET_STATE',
      payload: {
        test: [1, 2, 3],
      },
    });
  };

  return (
    <div className={styles.bookPage}>
      book page
      <div onClick={clickGoBack}>go back</div>
      <div onClick={clickGoApple}>go apple</div>
      <div>
        状态：
        {test.join(',')}
      </div>
      <div onClick={changeModel}>改变状态</div>
    </div>
  );
}

function mapStateToProps(state) {
  const { test } = state['jianghe/test'];
  return {
    test,
  };
}

export default connect(mapStateToProps)(BookPage);
