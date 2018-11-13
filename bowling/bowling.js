const utils = require('./utils');

const countBowlingScore = (input) => {
  const inputArr = utils.convertInputToIntArr(input);
  return utils.loopInputArr(inputArr);
};

module.exports = {
  countBowlingScore,
};
