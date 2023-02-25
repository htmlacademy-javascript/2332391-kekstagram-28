function checkStringLength (string, maxLength) {
  return string.length <= maxLength;
}

function isPalindrom (string) {
  const stringWithoutSpaces = string.toLowerCase().replaceAll(' ', '');
  const reversedString = stringWithoutSpaces.split('')
    .reverse()
    .join('');
  return reversedString === stringWithoutSpaces;
}

function extractOnlyDigits (string) {
  let digits = '';
  for (let i = 0; i < string.length; i++) {
    if (parseInt(string[i], 10)) {
      digits += string[i];
    }
  }
  return parseInt(digits, 10);
}

function myPadStart (string, minLength, pad) {
  const actualPad = minLength - string.length;
  if (actualPad <= 0) {
    return string;
  }
  return pad.slice(0, actualPad % pad.length) + pad.repeat(actualPad / pad.length) + string;
}
