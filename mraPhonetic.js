/**
 * Gets Match Rating Approach phonetic of english text.
 * @param {string} txt english text
 * @param {boolean} ext extended MRA? (false)
 */
function mraPhonetic(txt, ext=false) {
  var t = txt.replace(/[^A-Za-z]/g, '').toUpperCase();
  t = (t[0]+t.substr(1).replace(/[AEIOU]/g, '')).replace(/(.)\1+/g, '$1');
  return ext||t.length<=6? t:t.substr(0, 3)+t.substr(-3);
}
module.exports = mraPhonetic;
