/* eslint-disable class-methods-use-this */
const resumeModule = require('../model/resumeModule');

/**
 * 简历相关控制器
 */
class ResumeController {
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

const resumeController = new ResumeController();

module.exports = {
  // 获取技能接口
  'GET /getSkills/:userId': resumeController.getSkills,
  // 获取项目接口
  'GET /getProject/:userId': resumeController.getProject,
  // 获取主信息接口
  'GET /getMainInfo/:userId': resumeController.getMainInfo,
};
