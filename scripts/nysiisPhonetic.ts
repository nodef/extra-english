const objectReplacePrefix = require('string-objectreplaceprefix');
const objectReplaceSuffix = require('string-objectreplacesuffix');
const symbolAt = require('string-symbolat');
const PREFIXES = {'MAC': 'MCC', 'KN': 'NN', 'K': 'C', 'PH': 'FF', 'PF': 'FF', 'SCH': 'SSS'};
const SUFFIXES = {'EE': 'Y', 'IE': 'Y', 'DT': 'D', 'RT': 'D', 'RD': 'D', 'NT': 'D', 'ND': 'D'};
const INFIXES = {'EV': 'AF', 'A': 'A', 'E': 'A', 'I': 'A', 'O': 'A', 'U': 'A', 'Q': 'G', 'Z': 'S', 'M': 'N', 'KN': 'N', 'K': 'C', 'SCH': 'SSS', 'PH': 'FF', 'H': '', 'W': ''};
const SYMBOLS = new Set(Object.keys(INFIXES));
const VOWELS = 'AEIOU';

/**
 * Gets NYSIIS phonetic of english text.
 * @param {string} txt english text
 * @param {boolean} ext extended NYIIS? (false)
 */
function nysiisPhonetic(txt, ext=false) {
  var z = '';
  txt = txt.replace(/[^A-Za-z]/g, '').toUpperCase();
  txt = objectReplacePrefix(txt, PREFIXES, 3);
  txt = objectReplaceSuffix(txt, SUFFIXES, 2);
  for(var i=1, I=txt.length, t='', pc=''; i<I; i++) {
    var sym = symbolAt(txt, SYMBOLS, i, 3);
    if(sym==null) t = txt[i];
    else if(sym==='H') t = VOWELS.indexOf(txt[i-1])<0||VOWELS.indexOf(txt[i+1])<0? pc:sym;
    else if(sym==='W') t = VOWELS.indexOf(txt[i-1])>=0? 'A':sym;
    else t = INFIXES[sym];
    i += sym!=null? sym.length-1:0;
    for(var c of t) {
      if(c!==pc) z += c;
      pc = c;
    }
  }
  if(z.endsWith('S')) z = z.substr(0, z.length-1);
  if(z.endsWith('AY')) z = z.substr(0, z.length-2)+'Y';
  if(z.endsWith('A')) z = z.substr(0, z.length-1);
  z = (txt[0]||'')+z;
  return ext && z.length>6? z.substr(0, 6):z;
}
module.exports = nysiisPhonetic;
