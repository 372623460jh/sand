/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
const TEST_FETCH = 'TEST_FETCH';
const SET_STATE = 'SET_STATE';

export default {
  namespace: 'jianghe/test',

  state: {
    test: [],
  },

  subscriptions: {
    // 初始化
    init({ dispatch }): void {
      dispatch({
        type: TEST_FETCH,
        payload: {
          test: [3, 5, 6],
        },
      });
    },
  },

  effects: {
    // 获取文章数据
    *[TEST_FETCH]({ payload }, { put }) {
      yield put({
        type: SET_STATE,
        payload: {
          test: payload.test,
        },
      });
    },
  },

  reducers: {
    // set state
    [SET_STATE](state, action) {
      return { ...state, ...action.payload };
    },
  },
};
