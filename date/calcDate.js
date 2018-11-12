function splitInputValues(input) {
  const splitAMPM = input.split(' ');
  const AMPM = splitAMPM[0];
  const rawTime = splitAMPM[1];

  return {
    AMPM,
    rawTime,
  }
}

function convertTimeToNum(time) {
  const splitTime = time.split(':');

  const hour = parseInt(splitTime[0], 10);
  const min = parseInt(splitTime[1], 10);
  const sec = parseInt(splitTime[2], 10);

  const convertedHour = hour * 3600;
  const convertedMin = min * 60;

  return convertedHour + convertedMin + sec;
}

function convertNumToTime(num) {
  const totalMin = Math.floor(num / 60);
  const hour = Math.floor(totalMin / 60);
  const min = totalMin % 60;
  const sec = num % 60;

  return {
    hour,
    min,
    sec,
  }
}

function eval24TimeSystem(timeObj, AMPM) {
  const result = timeObj;

  // 오후 시간대: 12를 더해 24시간제에 맞춘다
  if (AMPM === 'PM') {
    result.hour += 12;
  }

  // 오전 시간대 자정: 12를 빼 24시간제에 맞춘다
  if (AMPM === 'AM' && result.hour === 12) {
    result.hour -= 12;
  }

  // 24시간 초과: 24시간을 뺀다
  if (result.hour >= 24) {
    result.hour -= 24;
  }

  return result;
}

function getFormattedTimeArr(timeObj) {
  const resultArr = [timeObj.hour, timeObj.min, timeObj.sec];
  return resultArr.map(item => (item < 10)  ? `0${item}` : item);
}

function calcAfterDate(input, num) {
  const splitTime = splitInputValues(input);
  const AMPM = splitTime.AMPM;
  const convertedNum = convertTimeToNum(splitTime.rawTime);

  const addedNum = convertedNum + num;
  const convertedTime = convertNumToTime(addedNum);

  const evaluatedTime = eval24TimeSystem(convertedTime, AMPM);
  const formattedTimeArr = getFormattedTimeArr(evaluatedTime);

  return `${formattedTimeArr[0]}:${formattedTimeArr[1]}:${formattedTimeArr[2]}`;
}

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
