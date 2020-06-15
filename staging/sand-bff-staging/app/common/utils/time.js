/**
 * 求两个date时间差
 * @param {*} nowTime 现在时间
 * @param {*} oldTime 老时间
 */
const getTimeSub = (nowTime, oldTime) => {
  const d = nowTime.getTime() - oldTime.getTime(); // 时间差的毫秒数
  // 计算出相差天数
  const year = Math.floor(d / (24 * 3600 * 1000 * 365));
  // 计算出相差天数
  const leave0 = d % (24 * 3600 * 1000 * 365); // 计算天数后剩余的毫秒数
  const days = Math.floor(leave0 / (24 * 3600 * 1000));
  // 计算出小时数
  const leave1 = leave0 % (24 * 3600 * 1000); // 计算天数后剩余的毫秒数
  const hours = Math.floor(leave1 / (3600 * 1000));
  // 计算相差分钟数
  const leave2 = leave1 % (3600 * 1000); // 计算小时数后剩余的毫秒数
  const minutes = Math.floor(leave2 / (60 * 1000));
  // 计算相差秒数
  const leave3 = leave2 % (60 * 1000); // 计算分钟数后剩余的毫秒数
  const seconds = Math.round(leave3 / 1000);

  return {
    year,
    day: days,
    hours,
    minutes,
    seconds,
  };
};

module.exports = {
  getTimeSub,
};
