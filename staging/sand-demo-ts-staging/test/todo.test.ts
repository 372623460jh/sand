import { decodeHtml, encodeHtml } from '../examples/utils';

describe('decode or encode', () => {
  // dva 相关测试
  test('decode or encode', () => {
    const decodeString = '<div>sss</div>';
    const encodeString = '&lt;div&gt;sss&lt;/div&gt;';
    expect(encodeHtml(decodeString)).toBe(encodeString);
    expect(decodeHtml(encodeString)).toBe(decodeString);
  });
});
