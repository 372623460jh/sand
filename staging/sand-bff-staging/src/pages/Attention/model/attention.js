import { getUserInfo, setUserInfo } from '../service';

const TEST_FETCH = 'TEST_FETCH';
const SET_FETCH = 'SET_FETCH';
const SET_STATE = 'SET_STATE';

export default {
  namespace: 'jianghe/test',

  state: {
    userId: '',
    userName: '',
  },

  subscriptions: {
    init({ dispatch }) {
      dispatch({
        type: TEST_FETCH,
        payload: {
          userName: 'init',
        },
      });
    },
  },

  effects: {
    // 获取用户信息
    * [TEST_FETCH]({ payload }, { put, call }) {
      const { data } = yield call(getUserInfo, payload);
      const { stat, result } = data;
      if (stat === 'ok') {
        const { userName, userId } = result;
        yield put({
          type: SET_STATE,
          payload: {
            userName,
            userId,
          },
        });
      }
    },
    // 设置用户信息
    * [SET_FETCH]({ payload }, { put, call }) {
      const { data } = yield call(setUserInfo, payload);
      const { stat, result } = data;
      if (stat === 'ok') {
        const { userName, userId } = result;
        yield put({
          type: SET_STATE,
          payload: {
            userName,
            userId,
          },
        });
      }
    },
  },

  reducers: {
    [SET_STATE](state, action) {
      return { ...state, ...action.payload };
    },
  },
};
