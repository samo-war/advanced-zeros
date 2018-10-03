const getCommonDivisions = (number, base) => {
  const sequence = [];
  const cD = [];
  for (var i = 2; i <= base; i++) {
    sequence.push(i);
  }

  let baseReminder = base;

  while(baseReminder !== 1) {
    const div = sequence.find(num => baseReminder % num === 0);

    baseReminder /= div;

    const divObj = cD.find(ob => ob.val === div);

    if (divObj) {
      divObj.count += 1;
    } else {
      cD.push({ val: div, count: 1 });
    }
  }

  return cD;
}

const getZerosCountByDivision = (number, division) => {
  const divs = [];
  let multiplier = 1;

  while (divs.slice(-1) && divs.slice(-1) <= number) {
    divs.push(Math.pow(division, multiplier++));
  }

  return divs.reduce((acc, cur) => acc + Math.floor(number / cur), 0);
}

module.exports = function getZerosCount(number, base) {
  const commonDivs = getCommonDivisions(number, base);

  const zerosCount = commonDivs.map(
    ({ val, count }) => Math.floor(getZerosCountByDivision(number, val) / count)
  );

  return Math.min.apply(null, zerosCount);
}