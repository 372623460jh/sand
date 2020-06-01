class DemoController {
  async getUserInfo(ctx) {
    ctx.response.body = {
      stat: 'ok',
      result: {
        userName: 'jianghe',
        userId: '112233',
      },
    };
  }

  async setUserInfo(ctx) {
    const { userName, userId } = ctx.request.body;
    ctx.response.body = {
      stat: 'ok',
      result: {
        userName,
        userId,
      },
    };
  }
}

const demoController = new DemoController();

module.exports = [
  {
    method: 'GET',
    route: '/demo/getUserInfo.json',
    controller: demoController.getUserInfo,
  },
  {
    method: 'POST',
    route: '/demo/setUserInfo.json',
    controller: demoController.setUserInfo,
  },
];
