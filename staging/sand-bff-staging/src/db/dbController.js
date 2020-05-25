/* eslint-disable consistent-return */
const Sequelize = require('sequelize');
const config = require('../config/dbConf');

const sequelize = new Sequelize(
  config.database,
  config.username,
  config.password,
  {
    host: config.host,
    dialect: 'mysql',
    pool: {
      max: 5,
      min: 0,
      idle: 30000,
    },
  },
);

const dbController = {
  /**
   * 获取技能详情
   * @param userId
   * @returns {Promise.<*>}
   */
  getSkills: async (userId) => {
    try {
      const p = await sequelize.query(
        'SELECT id,skillsName,img,useTime,score FROM skills where userId = ? ORDER BY score desc;',
        {
          replacements: [userId],
          type: sequelize.QueryTypes.SELECT,
        },
      );
      return p;
    } catch (err) {
      console.error(err);
    }
  },
  /**
   * 获取项目详细
   * @param userId
   * @returns {Promise.<*>}
   */
  getProject: async (userId) => {
    try {
      const p = await sequelize.query('select * FROM project WHERE userId = ? order BY orderIndex desc;',
        { replacements: [userId], type: sequelize.QueryTypes.SELECT });
      return p;
    } catch (err) {
      console.error(err);
    }
  },
  /**
   * 获取个人信息
   * @param userId
   * @returns {Promise.<*>}
   */
  getPerson: async (userId) => {
    try {
      const p = await sequelize.query('SELECT * FROM person WHERE userId = ? limit 1;',
        { replacements: [userId], type: sequelize.QueryTypes.SELECT });
      return p;
    } catch (err) {
      console.error(err);
    }
  },
  /**
   * 获取工作详情
   * @param userId
   * @returns {Promise.<*>}
   */
  getJob: async (userId) => {
    try {
      const p = await sequelize.query('SELECT * FROM job WHERE userId = ? order BY beginTime desc;',
        { replacements: [userId], type: sequelize.QueryTypes.SELECT });
      return p;
    } catch (err) {
      console.error(err);
    }
  },
  /**
   * 求职意向
   * @param userId
   * @returns {Promise.<*>}
   */
  getIntension: async (userId) => {
    try {
      const p = await sequelize.query('select position,trade,pay,intensionDesc from intension where userId = ?;',
        { replacements: [userId], type: sequelize.QueryTypes.SELECT });
      return p;
    } catch (err) {
      console.error(err);
    }
  },
};

module.exports = dbController;
