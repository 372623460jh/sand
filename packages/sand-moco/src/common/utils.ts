/**
 * 获取8位随机字符串
 */
function getRandom(): string {
  return Math.random() // 生成随机数字, eg: 0.123456
    .toString(36) // 转化成36进制 : "0.4fzyo82mvyr"
    .slice(-8);
}

/**
 * 节流
 * @param fn
 * @param time
 */
function throttle(fn: any, time: number): any {
  let lastTime = 0;
  return function (...args) {
    const nowTime = +new Date();
    if (!lastTime || nowTime - lastTime > time) {
      fn(...args);
      lastTime = nowTime;
    }
  };
}

/**
 * obj转url参数
 * @param data
 */
function obj2url(data: any): string {
  const result: string[] = [];
  // eslint-disable-next-line guard-for-in
  for (const key in data) {
    const value = data[key];
    if (typeof value !== 'string') {
      // value不是字符串，报错
      console.error('参数value只支持字符串');
      return '';
    }
    result.push(`${key}=${value}`);
  }
  return result.join('&');
}

/**
 * 校验类型item的tostring是不是为type
 * @param item
 * @param type
 * @return {boolean}
 */
function isType(item, type) {
  return {}.toString.call(item) === type;
}

export { getRandom, throttle, obj2url, isType };
