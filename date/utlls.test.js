const assert = require('assert');
const utils = require('./utils');

const exampleValues = {
  rawInput: 'AM 07:13:47',
  AM: 'AM',
  PM: 'PM',
  rawTime: '07:13:47',
  normalTimeObj: {
    hour: 7,
    min: 13,
    sec: 47,
  },
  midnightTimeObj: {
    hour: 12,
    min: 0,
    sec: 0,
  },
  addNum: 200000,
  over24Hours: 24 * 3 + 3,
};

const expectedValues = {
  splitTimeObj: {
    AMPM: 'AM',
    rawTime: '07:13:47',
  },
  convertedNum: 26027,
  convertedTimeObj: {
    hour: 55,
    min: 33,
    sec: 20,
  },
  evaluatedAMTime: {
    hour: 7,
    min: 13,
    sec: 47,
  },
  evaluatedPMTime: {
    hour: 19,
    min: 13,
    sec: 47,
  },
  evaluatedMidnightTime: {
    hour: 0,
    min: 0,
    sec: 0,
  },
  formattedNormalTimeArr: ['07', '13', '47'],
  removed24Hours: 3,
};

describe('Date: Utils', () => {
  it('should be splitInputValues', () => {
    assert.deepStrictEqual(
      utils.splitInputValues(exampleValues.rawInput),
      expectedValues.splitTimeObj,
    );
  });

  it('should be convertTimeToNum', () => {
    assert.deepStrictEqual(
      utils.convertTimeToNum(exampleValues.rawTime),
      expectedValues.convertedNum,
    );
  });

  it('should be convertNumToTime', () => {
    assert.deepStrictEqual(
      utils.convertNumToTime(exampleValues.addNum),
      expectedValues.convertedTimeObj,
    );
  });

  it('should be removeOver24HoursRecursive', () => {
    assert.deepStrictEqual(
      utils.removeOver24HoursRecursive(exampleValues.over24Hours),
      expectedValues.removed24Hours,
    );
  });

  describe('should be eval24TimeSystem', () => {
    it('should be evaluated AM time', () => {
      assert.deepStrictEqual(
        utils.eval24TimeSystem(exampleValues.normalTimeObj, exampleValues.AM),
        expectedValues.evaluatedAMTime,
      );
    });

    it('should be evaluated PM time', () => {
      assert.deepStrictEqual(
        utils.eval24TimeSystem(exampleValues.normalTimeObj, exampleValues.PM),
        expectedValues.evaluatedPMTime,
      );
    });

    it('should be evaluated midnight', () => {
      assert.deepStrictEqual(
        utils.eval24TimeSystem(exampleValues.midnightTimeObj, exampleValues.AM),
        expectedValues.evaluatedMidnightTime,
      );
    });
  });

  it('should be getFormattedTimeArr', () => {
    assert.deepStrictEqual(
      utils.getFormattedTimeArr(exampleValues.normalTimeObj),
      expectedValues.formattedNormalTimeArr,
    );
  });
});
