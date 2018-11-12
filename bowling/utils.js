const getScoreArr = (inputArr, head, numOfShotToEvalScore) => {
  return inputArr.slice(head, head + numOfShotToEvalScore);
};

exports.convertInputToIntArr = (input) => {
  const rawArr = input.split('');
  const convertedStrikeValueArr = rawArr.map(value => value === 'A' ? '10' : value);
  return convertedStrikeValueArr.map(value => parseInt(value, 10));
};

exports.isEnoughToEvalScore = (inputArr, head, numOfShotToEvalScore) => {
  const scoreArr = getScoreArr(inputArr, head, numOfShotToEvalScore);
  return scoreArr.length === numOfShotToEvalScore;
};

exports.getCurrentScore = (inputArr, head, numOfShotToEvalScore) => {
  const scoreArr = getScoreArr(inputArr, head, numOfShotToEvalScore);
  return scoreArr.reduce((prev, next) => prev + next);
};

exports.getPrevScore = (resultArr) => {
  return resultArr.slice(-1)[0] ? resultArr.slice(-1)[0] : 0;
};

exports.numOfShotToEvalScore = {
  strike: 3,
  spare: 3, // 스페어를 구성하기 위한 샷 2개 + 다음 샷
  open: 2,
};
