/**
 * 渲染场景的框
 * @param scene
 */
function renderWarp(scene: Phaser.Scene): Phaser.GameObjects.Graphics {
  const baseInfo = getBaseInfo();
  /**
   * 创建一个矩形的场景区域
   */
  const senceWarp = scene.add.graphics({
    x: 0,
    y: 0,
  });
  // 画矩形边
  senceWarp.lineStyle(5, 0xff00ff, 1.0);
  senceWarp.strokeRect(0, 0, baseInfo.baseWidth, baseInfo.baseHeight);
  return senceWarp;
}

/**
 * 设置摄像头 自适应窗口大小
 * @param scene
 */
function autoViewPort(scene: Phaser.Scene): void {
  const baseInfo = getBaseInfo();
  /**
   * 设置摄像头
   */
  const camera: Phaser.Cameras.Scene2D.Camera = scene.cameras.main;
  // 设置当前场景的原点在0，0
  camera.setOrigin(0, 0);
  // 相机缩放
  camera.setZoom(baseInfo.zoom);
  // 设置偏移量（设置居中）
  camera.setScroll(-baseInfo.deltaX, -baseInfo.deltaY);
}

/**
 * 计算视口基本信息
 */

// 基础宽高
const baseInfo: Info = {
  baseWidth: 750,
  baseHeight: 1624,
  baseRatio: 750 / 1624,
  realRatio: 0,
  realWidth: window.innerWidth,
  realHeight: window.innerHeight,
  zoom: 1,
  deltaX: 0,
  deltaY: 0,
};
function computeBaseInfo(type: string): Info {
  // 真实窗口比例
  baseInfo.realRatio = baseInfo.realWidth / baseInfo.realHeight;

  if (type === 'adaptWidth') {
    // 宽度适配
    baseInfo.zoom = baseInfo.realWidth / baseInfo.baseWidth;
    baseInfo.deltaX = 0;
    baseInfo.deltaY =
      (baseInfo.realHeight / baseInfo.zoom - baseInfo.baseHeight) / 2;
  }

  if (type === 'showAll') {
    // 场景居中全展示
    if (baseInfo.baseRatio > baseInfo.realRatio) {
      // 真实显示器更窄，使用宽做适配
      // 以宽为基准做缩放
      baseInfo.zoom = baseInfo.realWidth / baseInfo.baseWidth;
      // y轴偏移量
      baseInfo.deltaY =
        (baseInfo.realHeight / baseInfo.zoom - baseInfo.baseHeight) / 2;
      // x轴偏移量
      baseInfo.deltaX = 0;
    } else {
      // 真实显示器更宽，使用高做适配
      // 以高为基准做缩放
      baseInfo.zoom = baseInfo.realHeight / baseInfo.baseHeight;
      // x轴偏移量
      baseInfo.deltaX =
        (baseInfo.realWidth / baseInfo.zoom - baseInfo.baseWidth) / 2;
      // y轴偏移量
      baseInfo.deltaY = 0;
    }
  }
  return baseInfo;
}

/**
 * 获取基本信息
 */
function getBaseInfo(): Info {
  return baseInfo;
}

export { renderWarp, autoViewPort, computeBaseInfo, getBaseInfo };
