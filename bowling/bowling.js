const utils = require('./utils');

function countBowlingScore(input) {
  const inputArr = utils.convertInputToIntArr(input);
  const resultArr = [];

  let head = 0;
  let frame = 0;

  while (head < inputArr.length) {
    if (frame >= 10) {
      break;
    }

    const prevScore = utils.getPrevScore(resultArr);

    // 스트라이크
    if (inputArr[head] === 10) {
      if (!utils.isEnoughToEvalScore(inputArr, head, utils.numOfShotToEvalScore.strike)) {
        break;
      }

      const totalScore = prevScore + utils.getCurrentScore(inputArr, head, utils.numOfShotToEvalScore.strike);

      resultArr.push(totalScore);
      head += 1; // 현재 샷이 스트라이크면 다음 프레임은 바로 다음 샷이므로 head를 1만 전진시킨다
      frame += 1;

      continue;
    }

    // 스페어
    if (inputArr[head] + inputArr[head + 1] === 10) {
      if (!utils.isEnoughToEvalScore(inputArr, head, utils.numOfShotToEvalScore.spare)) {
        break;
      }

      const totalScore = prevScore + utils.getCurrentScore(inputArr, head, utils.numOfShotToEvalScore.spare);

      resultArr.push(totalScore);
      head += 2;
      frame += 1;

      continue;
    }

    // 오픈
    if (inputArr[head] + inputArr[head + 1] < 10) {
      if (!utils.isEnoughToEvalScore(inputArr, head, utils.numOfShotToEvalScore.open)) {
        break;
      }

      const totalScore = prevScore + utils.getCurrentScore(inputArr, head, utils.numOfShotToEvalScore.open);

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
