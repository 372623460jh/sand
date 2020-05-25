const { getTimeSub } = require('../utils/time');

describe('getTimeSub', () => {
  test('getTimeSub', () => {
    const { year } = getTimeSub(new Date(), new Date());

    expect(year).toBe(0);
  });
});
