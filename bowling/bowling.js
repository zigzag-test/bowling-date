const utils = require('./utils');

const countBowlingScore = (input) => {
  const inputArr = utils.convertInputToIntArr(input);
  return utils.loopInputArr(inputArr);
};

const inputExample = {
  perfect: 'AAAAAAAAAAAA',
  incomplete: '82A900519A',
  fullGame: '817390A63A82AA73A',
  error: '82A930519A',
};

console.log(countBowlingScore(inputExample.fullGame));
