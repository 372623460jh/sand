const { Controller } = require('@jianghe/sand-noco');
const resumeModule = require('../model/resumeModule');

/**
 * 简历相关控制器
 */
class ResumeController extends Controller {
  /**
   * 获取技能
   */
  async getSkills(ctx) {
    ctx.response.body = await resumeModule.getSkills(ctx.params.userId);
  }

  /**
   * 获取项目
   */
  async getProject(ctx) {
    ctx.response.body = await resumeModule.getProject(ctx.params.userId);
  }

  /**
   * 获取主信息
   */
  async getMainInfo(ctx) {
    ctx.response.body = await resumeModule.getMainInfo(ctx.params.userId);
  }
}

module.exports = ResumeController;
