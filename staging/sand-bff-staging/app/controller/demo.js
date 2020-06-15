const { Controller } = require('@jianghe/sand-noco');

class DemoController extends Controller {
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

module.exports = DemoController;
