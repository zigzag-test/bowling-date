const getScoreArr = (inputArr, head, numOfShots) => inputArr.slice(head, head + numOfShots);

const hasEnoughShotsToGetScore = (scoreArr, numOfShots) => scoreArr.length === numOfShots;

const getCurrentScore = scoreArr => scoreArr.reduce((prev, next) => prev + next);

const getPrevScore = resultArr => (resultArr.slice(-1)[0] ? resultArr.slice(-1)[0] : 0);

const getShotTypes = (inputArr, head) => {
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

const getShotProps = {
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

const convertInputToIntArr = (input) => {
  const rawArr = input.split('');
  const replacedStrikeValueArr = rawArr.map(value => (value === 'A' ? '10' : value));
  return replacedStrikeValueArr.map(value => parseInt(value, 10));
};

const loopInputArr = (inputArr) => {
  const resultArr = [];
  let head = 0;

  while (head < inputArr.length) {
    const shotTypes = getShotTypes(inputArr, head);

    if (shotTypes === 'error') {
      return shotTypes;
    }

    const { numOfShotsToGetScore, amountOfJump } = getShotProps[shotTypes];
    const scoreArr = getScoreArr(inputArr, head, numOfShotsToGetScore);

    if (!hasEnoughShotsToGetScore(scoreArr, numOfShotsToGetScore)) {
      break;
    }

    const prevScore = getPrevScore(resultArr);
    const currentScore = getCurrentScore(scoreArr);
    const totalScore = prevScore + currentScore;

    resultArr.push(totalScore);
    head += amountOfJump;
  }

  return resultArr;
};

module.exports = {
  getScoreArr,
  hasEnoughShotsToGetScore,
  getCurrentScore,
  getPrevScore,
  getShotTypes,
  getShotProps,
  convertInputToIntArr,
  loopInputArr,
};
