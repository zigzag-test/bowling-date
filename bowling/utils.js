const getScoreArr = (inputArr, head, numOfShot) => inputArr.slice(head, head + numOfShot);

exports.convertInputToIntArr = (input) => {
  const rawArr = input.split('');
  const convertedStrikeValueArr = rawArr.map(value => (value === 'A' ? '10' : value));
  return convertedStrikeValueArr.map(value => parseInt(value, 10));
};

exports.isEnoughToEvalScore = (inputArr, head, numOfShot) => {
  const scoreArr = getScoreArr(inputArr, head, numOfShot);
  return scoreArr.length === numOfShot;
};

exports.getCurrentScore = (inputArr, head, numOfShot) => {
  const scoreArr = getScoreArr(inputArr, head, numOfShot);
  return scoreArr.reduce((prev, next) => prev + next);
};

exports.getPrevScore = resultArr => (resultArr.slice(-1)[0] ? resultArr.slice(-1)[0] : 0);

exports.numOfShotToEvalScore = {
  strike: 3,
  spare: 3, // 스페어를 구성하기 위한 샷 2개 + 다음 샷
  open: 2,
};
