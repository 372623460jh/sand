const resumeModule = require('../model/resumeModule');

const signController = async (ctx) => {
  // ctx.cookies.set(
  //     'userId',
  //     'jianghe',
  //     {
  //         domain: 'localhost',  // 写cookie所在的域名
  //         path: '/',       // 写cookie所在的路径
  //         maxAge: 10 * 60 * 1000, // cookie有效时长
  //         expires: new Date('2018-02-15'),  // cookie失效时间
  //         httpOnly: false,  // 是否只用于http请求中获取
  //         overwrite: false  // 是否允许重写
  //     }
  // );
  ctx.response.body = '<h1>Index</h1>';
};

const getSkillsController = async (ctx) => {
  ctx.response.body = await resumeModule.getSkills(ctx.params.userId);
};
const getProjectController = async (ctx) => {
  ctx.response.body = await resumeModule.getProject(ctx.params.userId);
};
const getMainInfoController = async (ctx) => {
  ctx.response.body = await resumeModule.getMainInfo(ctx.params.userId);
};

module.exports = {
  'GET /': signController,
  'GET /getSkills/:userId': getSkillsController,
  'GET /getProject/:userId': getProjectController,
  'GET /getMainInfo/:userId': getMainInfoController,
};
