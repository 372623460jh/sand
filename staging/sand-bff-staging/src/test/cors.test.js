const { checkCorsOrigin } = require('../middleWare/cors');

describe('checkCorsOrigin', () => {
  test('checkCorsOrigin', () => {
    // false
    expect(checkCorsOrigin({
      header: {
        referer: 'http://wwwww.zirupay.com:111111/',
      },
    })).toBe('https://www.zirupay.com');

    expect(checkCorsOrigin({
      header: {
        referer: 'http://wwwww.zirupa.com:111111/',
      },
    })).toBe('https://www.zirupay.com');

    expect(checkCorsOrigin({
      header: {
        referer: 'http://www.zirupa.com:111111/',
      },
    })).toBe('https://www.zirupay.com');

    expect(checkCorsOrigin({
      header: {
        referer: 'https://www.zirupay.com:/',
      },
    })).toBe('https://www.zirupay.com');

    expect(checkCorsOrigin({
      header: {
        referer: 'https://www.zirupay.com111/',
      },
    })).toBe('https://www.zirupay.com');

    // true
    expect(checkCorsOrigin({
      header: {
        referer: 'http://www.zirupay.com:1234/',
      },
    })).toBe('http://www.zirupay.com:1234');

    expect(checkCorsOrigin({
      header: {
        referer: 'https://www.zirupay.com:1234/',
      },
    })).toBe('https://www.zirupay.com:1234');

    expect(checkCorsOrigin({
      header: {
        referer: 'https://www.zirupay.com/',
      },
    })).toBe('https://www.zirupay.com');

    expect(checkCorsOrigin({
      header: {
        referer: 'http://www.zirupay.com/',
      },
    })).toBe('http://www.zirupay.com');
  });
});
