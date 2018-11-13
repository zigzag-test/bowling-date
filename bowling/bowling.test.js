const assert = require('assert');
const bowling = require('./bowling');

const exampleGames = {
  perfect: 'AAAAAAAAAAAA',
  normal: '8070539191A80513790',
  incomplete: '82A900519A',
  error: '637953A',
};

const expectedScore = {
  perfect: [30, 60, 90, 120, 150, 180, 210, 240, 270, 300],
  normal: [8, 15, 23, 42, 62, 80, 88, 94, 113, 122],
  incomplete: [20, 39, 48, 53, 73],
  error: 'error',
};

describe('Bowling', () => {
  it('should be perfect game', () => {
    assert.deepStrictEqual(
      bowling.countBowlingScore(exampleGames.perfect),
      expectedScore.perfect,
    );
  });

  it('should be normal game', () => {
    assert.deepStrictEqual(
      bowling.countBowlingScore(exampleGames.normal),
      expectedScore.normal,
    );
  });

  it('should be incomplete game', () => {
    assert.deepStrictEqual(
      bowling.countBowlingScore(exampleGames.incomplete),
      expectedScore.incomplete,
    );
  });

  it('should be return error', () => {
    assert.deepStrictEqual(
      bowling.countBowlingScore(exampleGames.error),
      expectedScore.error,
    );
  });
});
