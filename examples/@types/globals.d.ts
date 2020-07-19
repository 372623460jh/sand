// https://www.typescriptlang.org/docs/handbook/declaration-merging.html

/**
 * 定义模块使ts中可加载less module文件
 */
declare module '*.less' {
  const resource: { [key: string]: string };
  export = resource;
}
