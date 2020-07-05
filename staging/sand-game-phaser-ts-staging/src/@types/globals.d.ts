// https://www.typescriptlang.org/docs/handbook/declaration-merging.html

/// <reference path="../../node_modules/phaser/types/SpinePlugin.d.ts" />
/// <reference path="../../node_modules/phaser/types/SpineFile.d.ts" />
/// <reference path="../../node_modules/phaser/types/SpineGameObject.d.ts" />
/// <reference path="../../node_modules/@types/webpack-env/index.d.ts" />

interface Info {
  // 标准宽
  baseWidth: number;
  // 标准高
  baseHeight: number;
  // 标准比例
  baseRatio: number;
  // 真实比例
  realRatio: number;
  // 真实宽
  realWidth: number;
  // 真实高
  realHeight: number;
  // 摄像头缩放比例
  zoom: number;
  // x轴偏移量
  deltaX: number;
  // y轴偏移量
  deltaY: number;
}

declare interface Window {
  SpinePlugin: SpinePlugin;
  baseInfo: Info;
}

/**
 * 定义模块使ts中可加载less module文件
 */
declare module '*.less' {
  const resource: { [key: string]: string };
  export = resource;
}

/**
 * ready后的回调
 */
type readyCallBack = () => void;
