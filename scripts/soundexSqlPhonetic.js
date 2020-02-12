const REMOVE = 'aeiouyhw';
const D1 = 'bfpv', D2 = 'cgjkqsxz', D3 = 'dt', D4 = 'l', D5 = 'mn', D6 = 'r';

/**
 * Gets Soundex phonetic (SQL) of english text.
 * @param {string} txt english text
 * @param {boolean} ext extended Soundex? (false)
 */
function soundexSqlPhonetic(txt, ext=false) {
  // 1. filter text, keep only alphabets
  var txt = txt.replace(/[^A-Za-z]/g, '').toLowerCase();
  var dp = 0, d = 0, z = '';
  // 2. get soundex code
  for(var c of txt) {
    // a. get digit
    if(REMOVE.indexOf(c)>=0) d = 0;
    else if(D1.indexOf(c)>=0) d = 1;
    else if(D2.indexOf(c)>=0) d = 2;
    else if(D3[0]===c || D3[1]===c) d = 3;
    else if(D4===c) d = 4;
    else if(D5[0]===c || D5[1]===c) d = 5;
    else d = 6;
    // b. update code
    if(!z.length) z += c.toUpperCase();
    else if(d && d!==dp) z += d;
    if(d) dp = d;
  }
  // 3. return normal/extended code
  var l = z.length;
  if(ext||!l) return z;
  if(l<4) return z+'000'.substr(0, 4-l);
  return z.substr(0, 4);
}
module.exports = soundexSqlPhonetic;
