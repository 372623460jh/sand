const { checkCorsOrigin } = require('../lib/utils/cors');

describe('checkCorsOrigin', () => {
  test('checkCorsOrigin', () => {
    expect(
      checkCorsOrigin({
        header: {
          referer: 'http://www.zirupay.com/',
        },
      })
    ).toBe('http://www.zirupay.com');
  });
});
