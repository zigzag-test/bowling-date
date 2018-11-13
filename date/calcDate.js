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

const inputExample = {
  PM1: 'PM 01:00:00',
  PM11: 'PM 11:59:59',
  AM12: 'AM 12:10:00',
  AM05: 'AM 05:24:03',
  midnight: 'AM 12:00:00',
};

console.log(calcAfterDate(inputExample.PM1, 10));
console.log(calcAfterDate(inputExample.PM11, 1));
console.log(calcAfterDate(inputExample.AM12, 40));
console.log(calcAfterDate(inputExample.AM05, 102392));
console.log(calcAfterDate(inputExample.midnight, 10));
