exports.convertInputToIntArr = (input) => {
  const rawArr = input.split('');
  const replacedStrikeValueArr = rawArr.map(value => (value === 'A' ? '10' : value));
  return replacedStrikeValueArr.map(value => parseInt(value, 10));
};

const getScoreArr = (inputArr, head, numOfShots) => inputArr.slice(head, head + numOfShots);

exports.hasEnoughValueToGetScore = (inputArr, head, numOfShots) => {
  const scoreArr = getScoreArr(inputArr, head, numOfShots);
  return scoreArr.length === numOfShots;
};

exports.getCurrentScore = (inputArr, head, numOfShots) => {
  const scoreArr = getScoreArr(inputArr, head, numOfShots);
  return scoreArr.reduce((prev, next) => prev + next);
};

exports.getPrevScore = resultArr => (resultArr.slice(-1)[0] ? resultArr.slice(-1)[0] : 0);

exports.getShotTypes = (inputArr, head) => {
  if (inputArr[head] === 10) {
    return 'strike';
  }

  if (inputArr[head] + inputArr[head + 1] === 10) {
    return 'spare';
  }

  if (inputArr[head] + inputArr[head + 1] < 10) {
    return 'open';
  }

  return 'error';
};

exports.getShotProps = {
  strike: {
    numOfShotsToGetScore: 3,
    amountOfJump: 1, // 스트라이크는 바로 다음 샷이 다음 프레임이므로 1칸만 점프
  },
  spare: {
    numOfShotsToGetScore: 3, // 스페어는 스페어를 이루는 두 샷과 다음 샷을 더해 점수 집계
    amountOfJump: 2,
  },
  open: {
    numOfShotsToGetScore: 2,
    amountOfJump: 2,
  },
};
