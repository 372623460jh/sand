/* eslint-disable import/no-extraneous-dependencies */
/* eslint-disable no-console */
import '@babel/polyfill';

// IE 8,9 typeof console.log 返回 'object'不能apply的情况
if (
  Function.prototype.bind &&
  window.console &&
  typeof console.log === 'object'
) {
  [
    'log',
    'info',
    'warn',
    'error',
    'assert',
    'dir',
    'clear',
    'profile',
    'profileEnd',
  ].forEach(function rebind(method) {
    console[method] = this.bind(console[method], console);
  }, Function.prototype.call);
}

// console/classList/raf的polyfill通过页面的conditional comment获取
if (!window.location.origin) {
  const { protocol, hostname, port } = window.location;
  // eslint-disable-next-line
  window.location.origin = `${protocol}//${hostname}${port ? `:${port}` : ''}`;
}
