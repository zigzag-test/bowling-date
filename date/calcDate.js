const utils = require('./utils');

const calcAfterDate = (input, num) => {
  const splitTime = utils.splitInputValues(input);
  const { AMPM, rawTime } = splitTime;
  const convertedNum = utils.convertTimeToNum(rawTime);

  const addedNum = convertedNum + num;
  const convertedTime = utils.convertNumToTime(addedNum);

  const evaluatedTime = utils.eval24TimeSystem(convertedTime, AMPM);
  const formattedTimeArr = utils.getFormattedTimeArr(evaluatedTime);

  return `${formattedTimeArr[0]}:${formattedTimeArr[1]}:${formattedTimeArr[2]}`;
};

module.exports = {
  calcAfterDate,
};
