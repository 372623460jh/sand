import { get, post } from '../../../common/fetch';

/**
 * 获取用户信息
 */
const getUserInfoUrl = '/demo/getUserInfo.json';
function getUserInfo(params) {
  return get(getUserInfoUrl, { ...params });
}

/**
 * 设置用户信息
 */
const setUserInfoUrl = '/demo/setUserInfo.json';
function setUserInfo(params) {
  return post(setUserInfoUrl, { ...params });
}

export {
  getUserInfo,
  setUserInfo,
};
