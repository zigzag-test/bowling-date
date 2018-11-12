const numOfShotToEvalScore = {
  strike: 3,
  spare: 3,
  open: 2,
};

function convertInputToIntArr(input) {
  const rawArr = input.split('');
  const convertedStrikeValueArr = rawArr.map(value => value === 'A' ? '10' : value);
  return convertedStrikeValueArr.map(value => parseInt(value, 10));
}

function isEnoughToEvalScore(inputArr, head, numOfShotToEvalScore) {
  const scoreArr = inputArr.slice(head, head + numOfShotToEvalScore);
  return scoreArr.length === numOfShotToEvalScore;
}

function getPrevScore(resultArr) {
  return resultArr.slice(-1)[0] ? resultArr.slice(-1)[0] : 0;
}

function getCurrentScore(inputArr, head, numOfShotToEvalScore) {
  const scoreArr = inputArr.slice(head, head + numOfShotToEvalScore);
  return scoreArr.reduce((prev, next) => prev + next);
}

function countBowlingScore(input) {
  const inputArr = convertInputToIntArr(input);
  const resultArr = [];

  let head = 0;
  let frame = 0;

  while (head < inputArr.length) {
    // 10 프레임을 넘기지 않는다
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
  normal: '82A900519A',
  longest: '11111111111111111111',
  error: '82A930519A',
};

console.log(countBowlingScore(inputExample.error));
