function countBowlingScore(frames) {
  const framesArray = frames.split('');
  const convertedStrikeValue = framesArray.map(item => item === 'A' ? '10' : item);
  const convertedIntValue = convertedStrikeValue.map(item => parseInt(item, 10));
  const resultArray = [];

  let head = 0;
  let frame = 0;

  while (head < convertedIntValue.length) {
    // 10프레임을 넘기지 않는다
    if (frame >= 10) {
      break;
    }

    // 스트라이크
    if (convertedIntValue[head] === 10) {
      if (convertedIntValue.slice(head, head + 3).length < 3) {
        break;
      }

      const prevCount = resultArray.slice(-1)[0] ? resultArray.slice(-1)[0] : 0;
      const countOfFrame = convertedIntValue.slice(head, head + 3).reduce((prev, next) => prev + next);
      const totalCount = prevCount + countOfFrame;

      resultArray.push(totalCount);
      head += 1;
      frame += 1;

      continue;
    }

    // 스페어
    if (convertedIntValue[head] + convertedIntValue[head + 1] === 10) {
      if (convertedIntValue.slice(head, head + 3).length < 3) {
        break;
      }

      const prevCount = resultArray.slice(-1)[0] ? resultArray.slice(-1)[0] : 0;
      const countOfFrame = convertedIntValue.slice(head, head + 3).reduce((prev, next) => prev + next);
      const totalCount = prevCount + countOfFrame;

      resultArray.push(totalCount);
      head += 2;
      frame += 1;

      continue;
    }

    // 오픈
    if (convertedIntValue[head] + convertedIntValue[head + 1] < 10) {
      if (convertedIntValue.slice(head, head + 2).length < 2) {
        break;
      }

      const prevCount = resultArray.slice(-1)[0] ? resultArray.slice(-1)[0] : 0;
      const countOfFrame = convertedIntValue.slice(head, head + 2).reduce((prev, next) => prev + next);
      const totalCount = prevCount + countOfFrame;

      resultArray.push(totalCount);
      head += 2;
      frame += 1;

      continue;
    }

    // 에러: 두 핀의 합이 10 초과
    if (convertedIntValue[head] + convertedIntValue[head + 1] > 10) {
      return 'error';
    }
  }

  return resultArray;
}

const inputObj = {
  perfect: 'AAAAAAAAAAAA',
  normal: '82A900519A',
  longest: '11111111111111111111',
  error: '82A930519A',
};

console.log(countBowlingScore(inputObj.normal));
