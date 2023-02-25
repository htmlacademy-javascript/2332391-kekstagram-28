function checkStringLength (string, maxLength) {
  return string.length <= maxLength;
}
checkStringLength('qwerty', 4);
function isPalindrom (string) {
  const stringWithoutSpaces = string.toLowerCase().replaceAll(' ', '');
  const reversedString = stringWithoutSpaces.split('')
    .reverse()
    .join('');
  return reversedString === stringWithoutSpaces;
}
isPalindrom('cat cat Cst');
function extractOnlyDigits (string) {
  let digits = '';
  for (let i = 0; i < string.length; i++) {
    if (parseInt(string[i], 10)) {
      digits += string[i];
    }
  }
  return parseInt(digits, 10);
}
extractOnlyDigits('123sdf23J28');
function myPadStart (string, minLength, pad) {
  const actualPad = minLength - string.length;
  if (actualPad <= 0) {
    return string;
  }
  return pad.slice(0, actualPad % pad.length) + pad.repeat(actualPad / pad.length) + string;
}
myPadStart('4232', 16, '*');
