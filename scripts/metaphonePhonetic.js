const REPLACES = [
  {p: /([^C])\1/g, v: '$1'},
  {p: /^[KGP]N/g, v: 'N'},
  {p: /^AE/g, v: 'E'},
  {p: /^WR/g, v: 'R'},
  {p: /MB$/g, v: 'M'},
  {p: /SCH/g, v: 'K'},
  {p: /C(IA|H)/g, v: 'X$1'},
  {p: /C(I|E|Y)/g, v: 'S$1'},
  {p: /C/g, v: 'K'},
  {p: /D(GE|GY|GI)/g, v: 'J$1'},
  {p: /D/g, v: 'T'},
  {p: /G(H[^AEIOU])/g, v: '$1'},
  {p: /G(N|NED)$/g, v: '$1'},
  {p: /([^G])G(I|E|Y)/g, v: '$1J$2'},
  {p: /G/g, v: 'K'},
  {p: /([AEIOU])H([^AEIOU])|([AEIOU])H$/g, v: '$1H$2'},
  {p: /CK/g, v: 'K'},
  {p: /PH/g, v: 'F'},
  {p: /Q/g, v: 'K'},
  {p: /S(H|IO|IA)/g, v: 'X$1'},
  {p: /T(IA|IO)/g, v: 'X$1'},
  {p: /TH/g, v: '0'},
  {p: /TCH/g, v: 'CH'},
  {p: /V/g, v: 'F'},
  {p: /^WH/g, v: 'W'},
  {p: /W([^AEIOU])|W$/g, v: '$1'},
  {p: /^X/g, v: 'S'},
  {p: /X/g, v: 'KS'},
  {p: /Y([^AEIOU])|Y$/g, v: '$1'},
  {p: /Z/g, v: 'S'},
  {p: /(.)[AEIOU]/g, v: '$1'}
];

/**
 * Gets Metaphone phonetic of english text.
 * @param {string} txt english text
 */
function metaphonePhonetic(txt) {
  var a = txt.replace(/[^A-Za-z]/g, '').toUpperCase();
  for(var r of REPLACES)
    a = a.replace(r.p, r.v);
  return a;
}
module.exports = metaphonePhonetic;
