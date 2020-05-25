const dbController = require('../db/dbController');
const { getTimeSub } = require('../utils/time');

const resumeModule = {
  getSkills: async (userId) => {
    const data = {};
    try {
      const p = await dbController.getSkills(userId);
      if (p.length === 0) {
        data.REV = false;
        data.MSG = '未查询到数据';
      } else {
        data.REV = true;
        const leftSkills = [];
        const rightSkills = [];
        // 将data拆分成左右显示的两组
        p.forEach((item, index) => {
          if (index % 2 === 0) {
            leftSkills.push(item);
          } else {
            rightSkills.push(item);
          }
        });
        data.DATA = {
          leftSkills,
          rightSkills,
        };
      }
    } catch (err) {
      data.REV = false;
      data.MSG = err.message;
    }
    return data;
  },
  getProject: async (userId) => {
    const data = {};
    try {
      const projects = await dbController.getProject(userId);
      if (projects.length === 0) {
        data.REV = false;
        data.MSG = '未查询到项目信息';
      } else {
        const projectArr = [];
        projects.forEach((item, index) => {
          const skillArr = item.skill.split('|');
          const skills = item.skill ? [] : '';
          if (item.skill) {
            skillArr.forEach((skillItem, skillIndex) => {
              skills.push({
                skillIndex,
                name: skillItem,
              });
            });
          }
          const imgArr = item.imgList.split('|');
          const imgs = item.imgList ? [] : '';
          if (item.imgList) {
            imgArr.forEach((imgItem, imgIndex) => {
              imgs.push({
                imgIndex,
                url: imgItem,
              });
            });
          }
          projectArr.push({
            index, // 索引值
            name: item.projectName,
            alias: item.projectAlias,
            img: item.img,
            projectBg: item.projectBg,
            projectTask: item.projectTask,
            projectDesc: item.projectDesc,
            projectRes: item.projectRes,
            skills,
            time: item.time,
            company: item.company,
            androidUrl: item.androidUrl,
            iosUrl: item.iosUrl,
            webUrl: item.webUrl,
            imgList: imgs,
          });
        });
        // 初始化返回数据
        data.REV = true;
        data.DATA = {
          project: projectArr,
        };
      }
    } catch (err) {
      data.REV = false;
      data.MSG = err.message;
    }
    return data;
  },
  /**
     * 获取首页信息
     * @param userId
     * @returns {Promise.<{}>}
     */
  getMainInfo: async (userId) => {
    const data = {};
    try {
      const personArr = await dbController.getPerson(userId);
      const jobArr = await dbController.getJob(userId);
      const intensionArr = await dbController.getIntension(userId);
      if (personArr.length === 0) {
        data.REV = false;
        data.MSG = '没有该用户信息';
      } else {
        const person = personArr[0];
        const work = [];
        const workInfo = [];

        // 初始化工作经历
        jobArr.forEach((item, index) => {
          const worktem1 = {};
          const worktem2 = {};
          worktem1.company = jobArr[index].company;
          worktem2.company = jobArr[index].company;
          worktem1.position = jobArr[index].position;
          worktem2.position = jobArr[index].position;
          worktem2.jobDesc = jobArr[index].jobDesc;
          worktem2.companyNature = jobArr[index].companyNature;
          const bt = jobArr[index].beginTime;
          const et = jobArr[index].endTime;
          worktem2.timeTrunk = `${bt.getFullYear()}.${bt.getMonth() + 1}~${et.getFullYear() === 2222 ? '至今' : `${et.getFullYear()}.${et.getMonth() + 1}`}`;
          work.push(worktem1);
          workInfo.push(worktem2);
        });

        // 学习时间
        const lebt = person.beginTime;
        const leet = person.endTime;

        // 初始化返回数据
        data.REV = true;
        data.DATA = {
          personInfo: {
            name: person.userName,
            sex: person.sex,
            age: `${getTimeSub(new Date(), person.birthday).year}岁`,
            education: person.education,
            workTime: `${getTimeSub(new Date(), person.endTime).year + 1}工作经验`,
            tel: person.tel,
            email: person.email,
            work,
          },
          workInfo,
          intension: intensionArr,
          education: {
            school: person.school,
            learnTime: `${lebt.getFullYear()}.${lebt.getMonth() + 1}~${leet.getFullYear() === 2222 ? '至今' : `${leet.getFullYear()}.${leet.getMonth() + 1}`}`,
            education: person.education,
            degree: person.degree,
            major: person.major,
            nature: person.nature,
          },
        };
      }
    } catch (err) {
      data.REV = false;
      data.MSG = err.message;
    }
    return data;
  },
};

module.exports = resumeModule;
