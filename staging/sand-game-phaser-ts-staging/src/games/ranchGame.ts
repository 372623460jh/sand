import Phaser from 'phaser';
import { computeBaseInfo } from '@/utils/view';
import RanchScene from '@/scenes/RanchScene';

/**
 * 农场游戏
 */

// 计算基本信息
const baseInfo = computeBaseInfo('adaptWidth');

class RangchGame extends Phaser.Game {
  constructor(ready: readyCallBack) {
    const config: Phaser.Types.Core.GameConfig = {
      type: Phaser.AUTO,
      // 渲染到哪个节点上
      parent: 'phaserRoot',
      width: baseInfo.realWidth,
      height: baseInfo.realHeight,
      // 透明
      transparent: true,
      scene: [new RanchScene('ranchGameScene', ready)],
    };

    super(config);
  }
}

export { RangchGame };
