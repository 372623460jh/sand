/**
 * routerPrefix 返回html的路由前缀
 */
const routerPrefix = '/spa';

module.exports = (app) => {
  /**
   * 挂载到koa实例下的controller实例
   */
  const { controller } = app;
  const { demo, entry, login, resume } = controller;

  return [
    {
      method: 'GET',
      route: '/demo/getUserInfo.json',
      controller: demo.getUserInfo,
    },
    {
      method: 'POST',
      route: '/demo/setUserInfo.json',
      controller: demo.setUserInfo,
    },
    {
      method: 'GET',
      route: '/',
      controller: entry.entryIndex,
    },
    {
      method: 'GET',
      route: new RegExp(`^${routerPrefix}(?:/|$)`),
      controller: entry.entryIndex,
    },
    {
      method: 'POST',
      route: '/login.json',
      controller: login.login,
    },
    {
      method: 'POST',
      route: '/test.json',
      controller: login.test,
    },
    {
      method: 'POST',
      route: '/logout.json',
      controller: login.logout,
    },
    {
      method: 'GET',
      route: '/getSkills/:userId',
      controller: resume.getSkills,
    },
    {
      method: 'GET',
      route: '/getProject/:userId',
      controller: resume.getProject,
    },
    {
      method: 'GET',
      route: '/getMainInfo/:userId',
      controller: resume.getMainInfo,
    },
  ];
};
