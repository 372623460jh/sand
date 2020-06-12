const DemoController = require('./controller/demo');
const EntryController = require('./controller/entry');
const LoginController = require('./controller/login');
const ResumeController = require('./controller/resume');

const demoController = new DemoController();
const entryController = new EntryController();
const loginController = new LoginController();
const resumeController = new ResumeController();

// routerPrefix
const routerPrefix = '/spa';

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
  {
    method: 'GET',
    route: '/',
    controller: entryController.entryIndex,
  },
  {
    method: 'GET',
    route: new RegExp(`^${routerPrefix}(?:/|$)`),
    controller: entryController.entryIndex,
  },
  {
    method: 'POST',
    route: '/login.json',
    controller: loginController.login,
  },
  {
    method: 'POST',
    route: '/test.json',
    controller: loginController.test,
  },
  {
    method: 'POST',
    route: '/logout.json',
    controller: loginController.logout,
  },
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
