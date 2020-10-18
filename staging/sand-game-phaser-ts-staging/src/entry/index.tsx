import React, { useEffect, useState } from 'react';
import ReactDOM from 'react-dom';
import { RangchGame } from '@/games/ranchGame';
import styles from './index.module.less';

function Index() {
  const [isReady, setIsReady] = useState(false);
  // 准备好后回调
  const ready = () => {
    setIsReady(true);
  };

  useEffect(() => {
    const game = new RangchGame(ready);
    console.log('game', game);
  }, []);

  return (
    <>
      <div className={styles.bgImg}>
        {isReady ? <div className={styles.bgTop} /> : null}
        {isReady ? <div className={styles.bgBottom} /> : null}
      </div>
      <div id="phaserRoot" />
    </>
  );
}

// 渲染界面
ReactDOM.render(<Index />, window.document.querySelector('#root'));
