const utils = require('./utils');

exports.countBowlingScore = (input) => {
  const inputArr = utils.convertInputToIntArr(input);
  return utils.loopInputArr(inputArr);
};
