const TEST_FETCH = 'TEST_FETCH';
const SET_STATE = 'SET_STATE';

export default {
  namespace: 'jianghe/test',

  state: {
    test: [],
  },

  subscriptions: {
    init({ dispatch }) {
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
    * [TEST_FETCH]({ payload }, { put }) {
      yield put({
        type: SET_STATE,
        payload: {
          test: payload.test,
        },
      });
    },
  },

  reducers: {
    [SET_STATE](state, action) {
      return { ...state, ...action.payload };
    },
  },
};
