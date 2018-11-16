# Zigzag test

1. 볼링 게임

- 샷 기록을 입력하면 누적 스코어 배열을 반환하는 함수입니다.

`bowling/bowling.js`의 `countBowlingScore` 함수를 사용하시면 됩니다.

입력받은 샷 기록을 배열로 변환해 순회하면서 스트라이크/스페어/오픈 을 파악하고,
그에 따라 합산해야 할 배열의 길이를 정한 뒤 reduce 함수를 이용해 스코어를 구했습니다.
각 기능을 순수 함수로 구현하려고 노력했고, 각 함수의 테스트 또한 갖추었습니다.

2. 날짜 계산기

- 12시간제 날짜와 n초를 입력하면 둘을 더한 값을 24시간제 날짜로 변환해 반환하는 함수입니다.

`date/calcDate.js`의 `calcAfterDate` 함수를 사용하시면 됩니다.

날짜와 AM/PM을 잘라낸 뒤 시간을 숫자로 변환하고, n초를 더한 뒤 다시 시간으로 변환합니다.

이때 기존 시간이 AM이었는지, PM이었는지에 따라 데이터를 업데이트하고,
만일 24시간이 초과한 값이 출력되면 시간 값이 24 이하가 될 때까지 재귀적으로 24를 뺐습니다.

자정의 경우는 구현하는 데 성공했지만 정오의 경우는 구현하지 못했습니다.
