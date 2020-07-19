import { obj2url } from '../src/common/utils';

describe('obj2url', () => {
  test('obj2url', () => {
    // 加密
    expect(obj2url({ ss: '111', sss: '222' })).toEqual('ss=111&sss=222');
  });
});
