const assert = require('assert');
const utils = require('./utils');

const exampleValues = {
  rawInput: '0123456789A',
  inputArr: {
    strike: [10, 3, 6, 1],
    spare: [2, 8, 7, 1],
    open: [3, 5, 1],
    error: [8, 6, 1],
    notEnough: [1],
  },
  resultArr: {
    empty: [],
    full: [7, 30],
  },
  head: 0,
};

const expectedValues = {
  convertedArr: [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10],
  shotTypes: {
    strike: 'strike',
    spare: 'spare',
    open: 'open',
    error: 'error',
  },
  scoreArr: {
    strike: [10, 3, 6],
    spare: [2, 8, 7],
    open: [3, 5],
  },
  prevScore: {
    empty: 0,
    full: 30,
  },
  currentScore: {
    strike: 19,
    spare: 17,
    open: 8,
  },
};

describe('Utils', () => {
  it('should be convertInputToIntArr', () => {
    assert.deepStrictEqual(
      utils.convertInputToIntArr(exampleValues.rawInput),
      expectedValues.convertedArr,
    );
  });

  describe('getShotTypes', () => {
    it('should be getShotTypes: strike', () => {
      assert.deepStrictEqual(
        utils.getShotTypes(exampleValues.inputArr.strike, exampleValues.head),
        expectedValues.shotTypes.strike,
      );
    });

    it('should be getShotTypes: spare', () => {
      assert.deepStrictEqual(
        utils.getShotTypes(exampleValues.inputArr.spare, exampleValues.head),
        expectedValues.shotTypes.spare,
      );
    });

    it('should be getShotTypes: open', () => {
      assert.deepStrictEqual(
        utils.getShotTypes(exampleValues.inputArr.open, exampleValues.head),
        expectedValues.shotTypes.open,
      );
    });

    it('should be getShotTypes: error', () => {
      assert.deepStrictEqual(
        utils.getShotTypes(exampleValues.inputArr.error, exampleValues.head),
        expectedValues.shotTypes.error,
      );
    });
  });

  describe('getPrevScore', () => {
    it('should be return 0 when resultArr is empty', () => {
      assert.deepStrictEqual(
        utils.getPrevScore(exampleValues.resultArr.empty),
        expectedValues.prevScore.empty,
      );
    });

    it('should be return last value when resultArr is full', () => {
      assert.deepStrictEqual(
        utils.getPrevScore(exampleValues.resultArr.full),
        expectedValues.prevScore.full,
      );
    });
  });

  describe('getScoreArr', () => {
    it('should be getScoreArr from inputArr: strike', () => {
      assert.deepStrictEqual(
        utils.getScoreArr(
          exampleValues.inputArr.strike,
          exampleValues.head,
          utils.getShotProps.strike.numOfShotsToGetScore,
        ),
        expectedValues.scoreArr.strike,
      );
    });

    it('should be getScoreArr from inputArr: spare', () => {
      assert.deepStrictEqual(
        utils.getScoreArr(
          exampleValues.inputArr.spare,
          exampleValues.head,
          utils.getShotProps.spare.numOfShotsToGetScore,
        ),
        expectedValues.scoreArr.spare,
      );
    });

    it('should be getScoreArr from inputArr: open', () => {
      assert.deepStrictEqual(
        utils.getScoreArr(
          exampleValues.inputArr.open,
          exampleValues.head,
          utils.getShotProps.open.numOfShotsToGetScore,
        ),
        expectedValues.scoreArr.open,
      );
    });
  });

  describe('hasEnoughShotsToGetScore', () => {
    it('should be return true when scoreArr hasEnoughShotsToGetScore', () => {
      assert.ok(
        utils.hasEnoughShotsToGetScore(
          expectedValues.scoreArr.strike,
          utils.getShotProps.strike.numOfShotsToGetScore,
        ),
      );

      assert.ok(
        utils.hasEnoughShotsToGetScore(
          expectedValues.scoreArr.spare,
          utils.getShotProps.spare.numOfShotsToGetScore,
        ),
      );

      assert.ok(
        utils.hasEnoughShotsToGetScore(
          expectedValues.scoreArr.open,
          utils.getShotProps.open.numOfShotsToGetScore,
        ),
      );
    });

    it('should be return false when scoreArr !hasEnoughShotsToGetScore', () => {
      assert.ok(
        !utils.hasEnoughShotsToGetScore(
          exampleValues.inputArr.notEnough,
          exampleValues.head,
          utils.getShotProps.strike.numOfShotsToGetScore,
        ),
      );
    });
  });

  describe('getCurrentScore', () => {
    it('should be getCurrentScore: strike', () => {
      assert.deepStrictEqual(
        utils.getCurrentScore(expectedValues.scoreArr.strike),
        expectedValues.currentScore.strike,
      );
    });

    it('should be getCurrentScore: spare', () => {
      assert.deepStrictEqual(
        utils.getCurrentScore(expectedValues.scoreArr.spare),
        expectedValues.currentScore.spare,
      );
    });

    it('should be getCurrentScore: open', () => {
      assert.deepStrictEqual(
        utils.getCurrentScore(expectedValues.scoreArr.open),
        expectedValues.currentScore.open,
      );
    });
  });
});
