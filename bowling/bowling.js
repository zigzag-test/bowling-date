const utils = require('./utils');

function loopInputArr(inputArr) {
  const resultArr = [];
  let head = 0;

  while (head < inputArr.length) {
    const shotTypes = utils.getShotTypes(inputArr, head);

    if (shotTypes === 'error') {
      return shotTypes;
    }

    if (
      !utils.hasEnoughValueToGetScore(
        inputArr,
        head,
        utils.getShotProps[shotTypes].numOfShotsToGetScore,
      )
    ) {
      break;
    }

    const prevScore = utils.getPrevScore(resultArr);
    const currentScore = utils.getCurrentScore(
      inputArr,
      head,
      utils.getShotProps[shotTypes].numOfShotsToGetScore,
    );
    const totalScore = prevScore + currentScore;

    resultArr.push(totalScore);
    head += utils.getShotProps[shotTypes].amountOfJump;
  }

  return resultArr;
}

function countBowlingScore(input) {
  const inputArr = utils.convertInputToIntArr(input);
  return loopInputArr(inputArr);
}

const inputExample = {
  perfect: 'AAAAAAAAAAAA',
  incomplete: '82A900519A',
  fullGame: '817390A63A82AA73A',
  error: '82A930519A',
};

console.log(countBowlingScore(inputExample.fullGame));
