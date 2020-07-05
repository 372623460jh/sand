/* eslint-disable @typescript-eslint/member-ordering */
import Phaser from 'phaser';
import {
  autoViewPort,
  // renderWarp,
  getBaseInfo,
} from '@/utils/view';
import { ChickenModel } from '@/model/Chicken';

/**
 * 牧场场景
 */
export default class RanchScene extends Phaser.Scene {
  // 模型实例索引，自增用来做模型实例在集合中的key
  private index = 0;

  // 粒子
  private particles: Phaser.GameObjects.Particles.ParticleEmitterManager;

  // 小鸡集合
  private chickenMap: any = {};

  // ready 回调
  private ready: readyCallBack = () => {};

  constructor(key: string, ready: readyCallBack) {
    super({
      key,
    });
    this.ready = ready;
  }

  /**
   * 初始化
   */
  init(): void {
    // 画场景框
    // renderWarp(this);
    // 视口适配
    autoViewPort(this);
    //
    const chickenList = [
      {
        data: {
          x: 400,
          y: 1000,
          displayWidth: 120,
          displayHeight: 120,
        },
      },
      {
        data: {
          x: 600,
          y: 800,
          displayWidth: 120,
          displayHeight: 120,
        },
      },
      {
        data: {
          x: 250,
          y: 750,
          displayWidth: 120,
          displayHeight: 120,
        },
      },
    ];
    // 初始化
    for (let index = 0; index < chickenList.length; index++) {
      const model = chickenList[index];
      // 实例化
      const chickenModel = new ChickenModel(model);
      // 生成唯一id
      const key = `spine_model_${this.index}`;
      // 写入集合
      this.chickenMap[key] = chickenModel;
      // 索引++
      this.index++;
      // 调用init初始化游戏对象
      chickenModel.init(this, key);
    }
  }

  /**
   * 预加载
   */
  preload(): void {
    this.load.atlas(
      'flares',
      // 粒子图片
      'https://gw.alipayobjects.com/mdn/rms_cdc660/afts/img/A*7r4bTYhnIK8AAAAAAAAAAABkARQnAQ',
      // 粒子图片的描述
      'https://gw.alipayobjects.com/os/bmw-prod/d8909cc2-64e5-40ce-97ac-dac64226f096.json'
    );
    // 牧场背景
    this.load.image(
      'ranchBg',
      'https://gw.alicdn.com/tfs/TB1gWBWXipE_u4jSZKbXXbCUVXa-1080-2160.png'
    );
    Object.keys(this.chickenMap).forEach((key) => {
      const model = this.chickenMap[key];
      // 循环调用集合中的preload方法
      model.preload();
    });
    // 资源加载完成回调
    this.load.on(
      'complete',
      () => {
        // 加载完成
        this.ready();
      },
      this
    );
  }

  /**
   * 创建
   */
  create(): void {
    // 渲染牧场背景
    this.renderRanchBg();
    // 粒子发射器
    this.renderParcile();
    Object.keys(this.chickenMap).forEach((key) => {
      const model = this.chickenMap[key];
      // 循环调用集合中的create方法
      model.create();
    });
  }

  /**
   * 游戏循环
   * @param _
   * @param delta
   */
  // eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
  update(...args): void {
    Object.keys(this.chickenMap).forEach((key) => {
      const model = this.chickenMap[key];
      // 循环调用集合中的update方法
      model.update(args);
    });
  }

  /**
   * 渲染牧场背景
   */
  private renderRanchBg(): void {
    const baseInfo = getBaseInfo();
    const ranchBg = this.add.image(
      baseInfo.baseWidth / 2,
      baseInfo.baseHeight / 2,
      'ranchBg'
    );
    ranchBg.displayWidth = 750;
    ranchBg.displayHeight = 750 * (2160 / 1080);
  }

  /**
   * 渲染一个粒子
   */
  private renderParcile(): void {
    // 小风的tween
    const lowWindTween: Phaser.Tweens.Tween = this.tweens.addCounter({
      from: -5,
      to: 5,
      duration: 11 * 1000,
      loop: Phaser.FOREVER,
      ease: 'Sine.easeInOut',
    });

    // 大风的tween
    const highWindTween = this.tweens.addCounter({
      from: -10,
      to: 10,
      duration: 4 * 1000,
      loop: Phaser.FOREVER,
      ease: 'Sine.easeInOut',
    });

    const lowProcessor: Phaser.GameObjects.Particles.GravityWell = {
      x: 0,
      y: 0,
      // 重力的强度
      power: 0,
      // 计算重力产生的距离
      epsilon: 100,
      active: true,
      update(particle) {
        // 水平方向偏移
        particle.velocityX += lowWindTween.getValue();
      },
    };

    const highProcessor: Phaser.GameObjects.Particles.GravityWell = {
      x: 0,
      y: 0,
      power: 0,
      epsilon: 100,
      active: true,
      update(particle) {
        // 水平方向偏移
        particle.velocityX += highWindTween.getValue();
      },
    };

    // 创建一个粒子发射管理器
    this.particles = this.add.particles('flares');

    // 添加一个重力管理器给个粒子发射管理器
    this.particles.addGravityWell(lowProcessor);
    this.particles.addGravityWell(highProcessor);

    // 发射器
    this.particles.createEmitter({
      // 使用哪些frame assets/particles/flares.json 中的描述
      frame: ['blue', 'yellow', 'green', 'red', 'white'],
      // 发射点
      x: 230,
      y: 350,
      // 存活的范围
      lifespan: 2000,
      // 发射速度
      speed: 200,
      // 最多
      // maxParticles: 40,
      // 顶层
      particleBringToTop: true,
      // 多长时间产生一个粒子
      frequency: 1000,
      // 角度
      // angle: { min: 0, max: 30 },
      // 大小变化
      scale: { start: 0.3, end: 0.1 },
      // 融合模式,当多个粒子重合时的显示模式 https://photonstorm.github.io/phaser3-docs/Phaser.BlendModes.html
      // ADD: 当两个形状重叠时，颜色通过添加颜色值来确定。
      blendMode: 'ADD',
    });

    // 发射器
    this.particles.createEmitter({
      // 使用哪些frame assets/particles/flares.json 中的描述
      frame: ['blue', 'yellow', 'green', 'red', 'white'],
      // 发射点
      x: 480,
      y: 400,
      // 存活的范围
      lifespan: 2000,
      // 发射速度
      speed: 200,
      // 最多
      // maxParticles: 40,
      // 顶层
      particleBringToTop: true,
      // 多长时间产生一个粒子
      frequency: 1500,
      // 角度
      // angle: { min: 0, max: 30 },
      // 大小变化
      scale: { start: 0.3, end: 0.1 },
      // 融合模式,当多个粒子重合时的显示模式 https://photonstorm.github.io/phaser3-docs/Phaser.BlendModes.html
      // ADD: 当两个形状重叠时，颜色通过添加颜色值来确定。
      blendMode: 'ADD',
    });
  }
}
