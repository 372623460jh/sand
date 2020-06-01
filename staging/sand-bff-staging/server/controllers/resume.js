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

module.exports = [
  {
    method: 'GET',
    route: '/getSkills/:userId',
    controller: resumeController.getSkills,
  },
  {
    method: 'GET',
    route: '/getProject/:userId',
    controller: resumeController.getProject,
  },
  {
    method: 'GET',
    route: '/getMainInfo/:userId',
    controller: resumeController.getMainInfo,
  },
];
