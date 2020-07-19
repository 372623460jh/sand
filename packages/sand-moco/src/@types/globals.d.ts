// https://www.typescriptlang.org/docs/handbook/declaration-merging.html

// eslint-disable-next-line spaced-comment
/// <reference path="../../../../node_modules/@types/webpack-env/index.d.ts" />

/**
 * 定义模块使ts中可加载less module文件
 */
declare module '*.less' {
  const resource: { [key: string]: string };
  export = resource;
}
