const numOfShotToEvalScore = {
  strike: 3,
  spare: 3, // 스페어를 구성하기 위한 샷 2개 + 다음 샷
  open: 2,
};

function convertInputToIntArr(input) {
  const rawArr = input.split('');
  const convertedStrikeValueArr = rawArr.map(value => value === 'A' ? '10' : value);
  return convertedStrikeValueArr.map(value => parseInt(value, 10));
}

function getScoreArr(inputArr, head, numOfShotToEvalScore) {
  return inputArr.slice(head, head + numOfShotToEvalScore);
}

function isEnoughToEvalScore(inputArr, head, numOfShotToEvalScore) {
  const scoreArr = getScoreArr(inputArr, head, numOfShotToEvalScore);
  return scoreArr.length === numOfShotToEvalScore;
}

function getCurrentScore(inputArr, head, numOfShotToEvalScore) {
  const scoreArr = getScoreArr(inputArr, head, numOfShotToEvalScore);
  return scoreArr.reduce((prev, next) => prev + next);
}

function getPrevScore(resultArr) {
  return resultArr.slice(-1)[0] ? resultArr.slice(-1)[0] : 0;
}

function countBowlingScore(input) {
  const inputArr = convertInputToIntArr(input);
  const resultArr = [];

  let head = 0;
  let frame = 0;

  while (head < inputArr.length) {
    if (frame >= 10) {
      break;
    }

    const prevScore = getPrevScore(resultArr);

    // 스트라이크
    if (inputArr[head] === 10) {
      if (!isEnoughToEvalScore(inputArr, head, numOfShotToEvalScore.strike)) {
        break;
      }

      const totalScore = prevScore + getCurrentScore(inputArr, head, numOfShotToEvalScore.strike);

      resultArr.push(totalScore);
      head += 1; // 현재 샷이 스트라이크면 다음 프레임은 바로 다음 샷이므로 head를 1만 전진시킨다
      frame += 1;

      continue;
    }

    // 스페어
    if (inputArr[head] + inputArr[head + 1] === 10) {
      if (!isEnoughToEvalScore(inputArr, head, numOfShotToEvalScore.spare)) {
        break;
      }

      const totalScore = prevScore + getCurrentScore(inputArr, head, numOfShotToEvalScore.spare);

      resultArr.push(totalScore);
      head += 2;
      frame += 1;

      continue;
    }

    // 오픈
    if (inputArr[head] + inputArr[head + 1] < 10) {
      if (!isEnoughToEvalScore(inputArr, head, numOfShotToEvalScore.open)) {
        break;
      }

      const totalScore = prevScore + getCurrentScore(inputArr, head, numOfShotToEvalScore.open);

      resultArr.push(totalScore);
      head += 2;
      frame += 1;

      continue;
    }

    // 에러: 두 핀의 합이 10 초과
    if (inputArr[head] + inputArr[head + 1] > 10) {
      return 'error';
    }
  }

  return resultArr;
}

const inputExample = {
  perfect: 'AAAAAAAAAAAA',
  incomplete: '82A900519A',
  fullGame: '817390A63A82AA73A',
  error: '82A930519A',
};

console.log(countBowlingScore(inputExample.fullGame));
