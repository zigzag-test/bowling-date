const assert = require('assert');
const calcDate = require('./calcDate');

const exampleDate = {
  PM1: 'PM 01:00:00',
  PM11: 'PM 11:59:59',
  AM12: 'AM 12:10:00',
  AM05: 'AM 05:24:03',
  AM07: 'AM 07:23:11',
  midnight: 'AM 12:00:00',
};

const addNum = {
  PM1: 10,
  PM11: 1,
  AM12: 40,
  AM05: 102392,
  AM07: 200000,
  midnight: 10,
};

const expectedDate = {
  PM1: '13:00:10',
  PM11: '00:00:00',
  AM12: '00:10:40',
  AM05: '09:50:35',
  AM07: '14:56:31',
  midnight: '00:00:10',
};

describe('Date: calcDate', () => {
  it('should be pass case1: PM1', () => {
    assert.deepStrictEqual(
      calcDate.calcAfterDate(exampleDate.PM1, addNum.PM1),
      expectedDate.PM1,
    );
  });

  it('should be pass case2: PM11', () => {
    assert.deepStrictEqual(
      calcDate.calcAfterDate(exampleDate.PM11, addNum.PM11),
      expectedDate.PM11,
    );
  });

  it('should be pass case3: AM12', () => {
    assert.deepStrictEqual(
      calcDate.calcAfterDate(exampleDate.AM12, addNum.AM12),
      expectedDate.AM12,
    );
  });

  it('should be pass case4: AM05', () => {
    assert.deepStrictEqual(
      calcDate.calcAfterDate(exampleDate.AM05, addNum.AM05),
      expectedDate.AM05,
    );
  });

  it('should be pass case5: AM07', () => {
    assert.deepStrictEqual(
      calcDate.calcAfterDate(exampleDate.AM07, addNum.AM07),
      expectedDate.AM07,
    );
  });

  it('should be pass case6: midnight', () => {
    assert.deepStrictEqual(
      calcDate.calcAfterDate(exampleDate.midnight, addNum.midnight),
      expectedDate.midnight,
    );
  });
});
