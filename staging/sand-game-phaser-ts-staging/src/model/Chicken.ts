import { getBaseInfo } from '@/utils/view';

/**
 * json的格式
 */
interface chickenModelJson {
  data: chickenData;
}

/**
 * 模型中数据的格式
 */
interface chickenData {
  x?: number;
  y?: number;
  displayWidth?: number;
  displayHeight?: number;
  flipX?: boolean;
}

/**
 * 行走
 */
interface walkAttr {
  // 水平偏移
  vx: number;
  // 竖直偏移
  vy: number;
  // 行走中
  walking: boolean;
  // 行走任务
  walktask: any;
  // 行走概率
  walkProbability: number;
}

/**
 * 小鸡状态枚举
 */
const CHICKEN_STATUS_ENUM = {
  // 饿了
  hungry: 'hungry',
  // 正常
  normal: 'normal',
  // 安抚
  pacify: 'pacify',
};

/**
 * 小鸡类
 */
class ChickenModel {
  // id 该游戏对象的id
  private id: string;

  // 初始化数据
  private modelData: chickenData;

  // 小鸡的状态
  private status: string;

  // 小鸡多久会饿ms
  private hungryTime: number = 10 * 1000;

  // imageBody
  // private imageBody: Phaser.GameObjects.Image;

  // 场景
  private scene: Phaser.Scene;

  // 饿了的任务
  private task: any;

  // 行走中
  private walkState: walkAttr = {
    walkProbability: 0.006 * 100,
    vx: 0,
    vy: 0,
    walking: false,
    walktask: null,
  };

  // 小鸡转向概率
  private turnProbability: number = 0.006 * 100;

  // 小鸡饿了的实例
  private chickenHungry: Phaser.GameObjects.Image = null;

  // 小鸡饿了tip实例
  private hungryTips: Phaser.GameObjects.Image = null;

  // 小鸡正常的实例
  private chickenNormal: Phaser.GameObjects.Image = null;

  // // 小鸡的行走边界x
  // private boundaryX: number[] = [50, 700];

  // // 小鸡的行走边界y
  // private boundaryY: number[] = [630, 1230];

  // 提示的相关属性
  private tipsObj: any = {
    tipsTween: Phaser.Tweens,
  };

  // 拖拽信息
  private touchInfo: any = {
    sx: 0,
    sy: 0,
    draw: false,
    tween: null,
  };

  constructor(json: chickenModelJson) {
    const {
      data = {
        x: 0,
        y: 0,
        displayWidth: 100,
        displayHeight: 100,
      },
    } = json;
    this.modelData = data;
    this.status = CHICKEN_STATUS_ENUM.normal;
    this.hungryTime = (4 + Math.round(Math.random() * 12)) * 1000;
  }

  /**
   * 初始化
   * @param scene
   */
  init(scene: Phaser.Scene, id: string): void {
    this.scene = scene;
    this.id = id;
    console.log(this.id);
  }

  /**
   * 预加载资源方法
   */
  preload(): void {
    // 小鸡饿了
    this.scene.load.image(
      'chickenHungry',
      'https://gw.alicdn.com/tfs/TB1Bft7ajMZ7e4jSZFOXXX7epXa-300-300.png'
    );
    // 小鸡的正常状态
    this.scene.load.image(
      'chickenNormal',
      'https://gw.alicdn.com/tfs/TB1sPOmMoY1gK0jSZFMXXaWcVXa-300-300.png'
    );
    // 饿了浮层
    this.scene.load.image(
      'hungryTips',
      'https://gw.alicdn.com/tfs/TB1yCV7Xkcx_u4jSZFlXXXnUFXa-300-300.png'
    );
  }

  /**
   * 创建
   */
  create(): void {
    // 绘制小鸡正常
    this.renderNormal();
    // 启动小鸡饿了任务
    this.hungryTask();

    // // 小鸡的行走区域
    // this.scene.add
    //   .graphics({
    //     x: this.boundaryX[0],
    //     y: this.boundaryY[0],
    //   })
    //   .lineStyle(2, 0xff0000, 1.0)
    //   .strokeRect(
    //     0,
    //     0,
    //     this.boundaryX[1] - this.boundaryX[0],
    //     this.boundaryY[1] - this.boundaryY[0]
    //   );
  }

  /**
   * 游戏循环
   */
  update(): void {
    if (this.status === CHICKEN_STATUS_ENUM.normal) {
      this.renderNormal();
    } else if (this.status === CHICKEN_STATUS_ENUM.hungry) {
      this.renderHungry();
    }
  }

  /**
   * 定时任务用来处理小鸡饿了没
   */
  private hungryTask() {
    if (this.status === CHICKEN_STATUS_ENUM.normal) {
      clearTimeout(this.task);
      this.task = setTimeout(() => {
        // 小鸡饿了
        this.status = CHICKEN_STATUS_ENUM.hungry;
      }, this.hungryTime);
    }
  }

  /**
   * 喂食小鸡
   */
  private feedChicken(): boolean {
    if (this.status === CHICKEN_STATUS_ENUM.hungry) {
      // 修改为normal
      this.status = CHICKEN_STATUS_ENUM.normal;
      // 重新开启小鸡饿了任务
      this.hungryTask();
      return true;
    }
    // 小鸡不饿
    return false;
  }

  /**
   * 小鸡饿了
   */
  private renderHungry() {
    if (!this.chickenHungry || !this.hungryTips) {
      this.chickenHungry = this.scene.add.image(
        this.modelData.x,
        this.modelData.y,
        'chickenHungry'
      );
      this.hungryTips = this.scene.add.image(
        this.modelData.x + 10,
        this.modelData.y - 110,
        'hungryTips'
      );
      // 使游戏对象可以交互
      this.hungryTips.setInteractive();
      // 添加点击事件
      this.hungryTips.addListener(
        'pointerdown',
        () => {
          this.feedChicken();
        },
        this
      );
      // tips运动的补间动画
      this.tipsObj.tipsTween = this.scene.tweens.addCounter({
        from: -10,
        to: 10,
        duration: 1.5 * 1000,
        loop: Phaser.FOREVER,
        // 反转补间
        yoyo: true,
        ease: 'Sine.easeInOut',
      });
    }
    // 全部隐藏
    this.disableAll();
    this.chickenHungry.visible = true;
    this.hungryTips.visible = true;
    // 渲染位置
    this.chickenHungry.x = this.modelData.x;
    this.chickenHungry.y = this.modelData.y;

    this.hungryTips.x = this.modelData.x + 10;
    this.hungryTips.y =
      this.modelData.y - 110 + this.tipsObj.tipsTween.getValue();
    // 渲染宽度
    this.chickenHungry.displayWidth = this.modelData.displayWidth;
    this.chickenHungry.displayHeight = this.modelData.displayHeight;
    this.hungryTips.displayWidth = this.modelData.displayWidth;
    this.hungryTips.displayHeight = this.modelData.displayHeight;
  }

  /**
   * 小鸡正常状态
   */
  private renderNormal(): void {
    if (!this.chickenNormal) {
      // 没有小鸡实例先实例化
      this.chickenNormal = this.scene.add.image(
        this.modelData.x,
        this.modelData.y,
        'chickenNormal'
      );

      // 渲染小鸡初始化宽度
      this.chickenNormal.displayWidth = this.modelData.displayWidth;
      this.chickenNormal.displayHeight = this.modelData.displayHeight;

      // 给正常的小鸡添加拖拽事件
      this.addMoveEvent();
    }

    this.disableAll();
    this.chickenNormal.visible = true;

    // 计算小鸡位置
    this.modelData.x += this.walkState.vx;
    this.modelData.y += this.walkState.vy;
    this.chickenNormal.x = this.modelData.x;
    this.chickenNormal.y = this.modelData.y;

    if (!this.walkState.walking) {
      // 小鸡不在行走中
      if (Math.random() * 100 < this.turnProbability) {
        // 转向
        this.turn();
      }
      if (
        Math.random() * 100 < this.walkState.walkProbability &&
        !this.touchInfo.draw // 不在拖拽中
      ) {
        // 行走1s
        this.walk(1000);
      }
    }
  }

  /**
   * 给小鸡添加移动事件
   */
  private addMoveEvent(): void {
    const { zoom } = getBaseInfo();
    // 使游戏对象可以点击
    this.chickenNormal.setInteractive();
    this.chickenNormal.on('pointerdown', (pointer) => {
      if (pointer.leftButtonDown()) {
        this.touchInfo.draw = true;
        this.touchInfo.sx = pointer.x;
        this.touchInfo.sy = pointer.y;
        // 清除行走
        this.clearWalk();
        // 点击时小鸡变大
        this.scene.tweens.add({
          targets: this.chickenNormal,
          displayWidth: this.modelData.displayWidth + 30,
          delay: 0,
          duration: 500,
          ease: 'Power2',
        });
        this.scene.tweens.add({
          targets: this.chickenNormal,
          displayHeight: this.modelData.displayHeight + 30,
          delay: 0,
          duration: 500,
          ease: 'Power2',
        });
      }
    });
    this.chickenNormal.on('pointerup', () => {
      this.touchInfo.sx = 0;
      this.touchInfo.sy = 0;
      this.touchInfo.draw = false;
      // 小鸡变正常
      this.scene.tweens.add({
        targets: this.chickenNormal,
        displayWidth: this.modelData.displayWidth,
        delay: 0,
        duration: 500,
        ease: 'Power2',
      });
      this.scene.tweens.add({
        targets: this.chickenNormal,
        displayHeight: this.modelData.displayHeight,
        delay: 0,
        duration: 500,
        ease: 'Power2',
      });
      // 重启饥饿任务
      this.hungryTask();
    });
    this.chickenNormal.on('pointermove', (pointer) => {
      if (this.touchInfo.draw && pointer.noButtonDown() === false) {
        // 需要考虑整个摄像头的缩放比例
        this.modelData.x += (pointer.x - this.touchInfo.sx) / zoom;
        this.modelData.y += (pointer.y - this.touchInfo.sy) / zoom;
        this.touchInfo.sx = pointer.x;
        this.touchInfo.sy = pointer.y;
      }
    });
  }

  /**
   * 小鸡转向
   * @param time 行走时间
   * @param direction 行走方向
   */
  private turn(): void {
    // 水平翻转
    this.modelData.flipX = !this.modelData.flipX;
    this.chickenNormal.flipX = this.modelData.flipX;
  }

  /**
   * 小鸡行走
   * @param time 行走时间
   */
  private walk(time: number): void {
    if (!this.walkState.walking) {
      // 没行走
      clearTimeout(this.walkState.walktask);
      this.walkState.walktask = null;
      // 根据面向判断行走方向
      this.walkState.vy = 0.5;
      this.walkState.vx = this.modelData.flipX ? -0.5 : 0.5;
      this.walkState.walking = true;
      this.walkState.walktask = setTimeout(() => {
        // 清除行走
        this.clearWalk();
      }, time);
    }
  }

  /**
   * 清除小鸡行走
   */
  private clearWalk(): void {
    if (this.walkState.walking) {
      clearTimeout(this.walkState.walktask);
      this.walkState.walking = false;
      this.walkState.vy = 0;
      this.walkState.vx = 0;
      this.walkState.walktask = null;
    }
  }

  /**
   * 隐藏全部
   */
  private disableAll() {
    if (this.chickenHungry) {
      this.chickenHungry.visible = false;
    }
    if (this.hungryTips) {
      this.hungryTips.visible = false;
    }
    if (this.chickenNormal) {
      this.chickenNormal.visible = false;
    }
  }
}

export { ChickenModel };
