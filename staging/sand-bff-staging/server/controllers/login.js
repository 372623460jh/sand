class LoginController {
  /**
   * 登录控制器
   */
  async login(ctx) {
    ctx.cookies.set('userId', 'jianghe', {
      domain: 'localhost', // 写cookie所在的域名
      path: '/', // 写cookie所在的路径
      maxAge: 10 * 60 * 1000, // cookie有效时长
      expires: new Date('2018-02-15'), // cookie失效时间
      httpOnly: false, // 是否只用于http请求中获取
      overwrite: false, // 是否允许重写
    });
    ctx.response.body = {
      stat: 'ok',
      resule: 'hahaha',
    };
  }
}

const loginController = new LoginController();

module.exports = [
  {
    method: 'POST',
    route: '/login.json',
    controller: loginController.login,
  },
];
