const REPLACES = [
  {p: /^cough/g, v: 'cou2f'},
  {p: /^rough/g, v: 'rou2f'},
  {p: /^tough/g, v: 'tou2f'},
  {p: /^enough/g, v: 'enou2f'},
  {p: /^gn/g, v: '2n'},
  {p: /mb$/g, v: 'm2'},
  {p: /cq/g, v: '2q'},
  {p: /ci/g, v: 'si'},
  {p: /ce/g, v: 'se'},
  {p: /cy/g, v: 'sy'},
  {p: /tch/g, v: '2ch'},
  {p: /c/g, v: 'k'},
  {p: /q/g, v: 'k'},
  {p: /x/g, v: 'k'},
  {p: /v/g, v: 'f'},
  {p: /dg/g, v: '2g'},
  {p: /tio/g, v: 'sio'},
  {p: /tia/g, v: 'sia'},
  {p: /ph/g, v: 'fh'},
  {p: /b/g, v: 'p'},
  {p: /sh/g, v: 's2'},
  {p: /z/g, v: 's'},
  {p: /^[aeiou]/g, v: 'A'},
  {p: /[aeiou]/g, v: '3'},
  {p: /3gh3/g, v: '3kh3'},
  {p: /gh/g, v: '22'},
  {p: /g/g, v: 'k'},
  {p: /ss+/g, v: 'S'},
  {p: /tt+/g, v: 'T'},
  {p: /pp+/g, v: 'P'},
  {p: /kk+/g, v: 'K'},
  {p: /ff+/g, v: 'F'},
  {p: /mm+/g, v: 'M'},
  {p: /nn+/g, v: 'N'},
  {p: /w3/g, v: 'W3'},
  {p: /wy/g, v: 'Wy'},
  {p: /wh3/g, v: 'Wh3'},
  {p: /why/g, v: 'Why'},
  {p: /^h/g, v: 'A'},
  {p: /h/g, v: '2'},
  {p: /r3/g, v: 'R3'},
  {p: /ry/g, v: 'Ry'},
  {p: /r/g, v: '2'},
  {p: /l3/g, v: 'L3'},
  {p: /ly/g, v: 'Ly'},
  {p: /l/g, v: '2'},
  {p: /j/g, v: 'y'},
  {p: /y3/g, v: 'Y3'},
  {p: /y/g, v: '2'},
  {p: /2/g, v: ''},
  {p: /3/g, v: ''},
  {p: /z/g, v: 's'},
  {p: /z/g, v: 's'},
  {p: /z/g, v: 's'},
  {p: /z/g, v: 's'},
];

/**
 * Gets Caverphone phonetic of english text.
 * @param {string} txt english text
 * @param {boolean} ext extended caverphone? (false)
 */
function caverphonePhonetic(txt, ext=false) {
  var t = txt.replace(/[^A-Za-z]/g, '').toLowerCase();
  for(var r of REPLACES)
    t = t.replace(r.p, r.v);
  t = ext? t:(t+'111111').substr(0, 6);
  return t.toUpperCase();
}
const FAEIJOUY = () => '0', FH = () => '', FB = () => '1', FP = (b) => b!=='H'? '1':'3';
const FDT = (b) => 'CSZ'.indexOf(b)<0? '2':'8', FFVW = () => '3', FGKQ = () => '4';
const FC = (b, a, i) => (i && 'AHKLOQRUX'.indexOf(b)>=0)||('AHKOQUX'.indexOf(b)>=0 && 'SZ'.indexOf(a)<0)? '4':'8';
const FX = (b, a) => 'CKQ'.indexOf(a)<0? '48':'8', FL = () => '5', FMN = () => '6', FR = () => '7', FSZ = () => '8';
const TABLE = new Map([
  ['A', FAEIJOUY], ['B', FB], ['C', FC], ['D', FDT], ['E', FAEIJOUY], ['F', FFVW], ['G', FGKQ], ['H', FH],
  ['I', FAEIJOUY], ['J', FAEIJOUY], ['K', FGKQ], ['L', FL], ['M', FMN], ['N', FMN], ['O', FAEIJOUY], ['P', FP],
  ['Q', FGKQ], ['R', FR], ['S', FSZ], ['T', FDT], ['U', FAEIJOUY], ['V', FFVW], ['W', FFVW], ['X', FX],
  ['Y', FAEIJOUY], ['Z', FSZ]
]);

/**
 * Gets Cologne phonetic of english text.
 * @param {string} txt english text
 */
function colognePhonetic(txt) {
  var t = txt.replace(/[^A-Za-z]/g, '').toUpperCase().replace(/[ÄÖÜß]/g, 'A');
  var z = TABLE.get(t[0])(t[1], ' ', true);
  for(var i=1, I=t.length, pc=z; i<I; i++) {
    var c = TABLE.get(t[i])(t[i+1], t[i-1], i===0);
    if(c!==pc && c!=='0') z += c;
    pc = c;
  }
  return z;
}
const REPLACES2 = [
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
  for(var r of REPLACES2)
    a = a.replace(r.p, r.v);
  return a;
}
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
function objectReplacePrefix(str, obj, l=0) {
  // 1. get max prefix length
  if(!l) for(var k in obj) {
    l = l<k.length? k.length:l;
  }
  // 2. replace prefix
  for(var i=l; i; i--) {
    var k = str.substr(0, i);
    if(obj[k]!=null) return obj[k]+str.substr(i);
  }
  return str;
}
function objectReplaceSuffix(str, obj, l=0) {
  // 1. get max suffix length
  if(!l) for(var k in obj) {
    l = l<k.length? k.length:l;
  }
  // 2. replace suffix
  for(var i=l; i; i--) {
    var k = str.substr(-i);
    if(obj[k]!=null) return str.substr(0, str.length-i)+obj[k];
  }
  return str;
}
function symbolAt(str, set, i=0, L=0) {
  if(!L) for(var k of set) {
    L = L<k.length? k.length:L;
  }
  for(var l=L; l; l--) {
    var sym = str.substr(i, l);
    if(set.has(sym)) return sym;
  }
}
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
const VOWEL = 'aeiouy', REMOVE = 'aeiouyhw';
const D1 = 'bfpv', D2 = 'cgjkqsxz', D3 = 'dt', D4 = 'l', D5 = 'mn', D6 = 'r';

/**
 * Gets Soundex phonetic of english text.
 * @param {string} txt english text
 * @param {boolean} ext extended Soundex? (false)
 */
function soundexPhonetic(txt, ext=false) {
  // 1. filter text, keep only alphabets
  var txt = txt.replace(/[^A-Za-z]/g, '').toLowerCase();
  var dp = 0, d = 0, v = false, z = '';
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
    else if(d && (d!==dp || v)) z += d;
    // c. track vowel, previous digit
    v = d? false:(v||VOWEL.indexOf(c)>=0);
    dp = d? d:dp;
  }
  // 3. return normal/extended code
  var l = z.length;
  if(ext||!l) return z;
  if(l<4) return z+'000'.substr(0, 4-l);
  return z.substr(0, 4);
}
const REMOVE9 = 'aeiouyhw';
const D19 = 'bfpv', D29 = 'cgjkqsxz', D39 = 'dt', D49 = 'l', D59 = 'mn', D69 = 'r';

/**
 * Gets Soundex phonetic (SQL) of english text.
 * @param {string} txt english text
 * @param {boolean} ext extended Soundex SQL? (false)
 */
function soundexSqlPhonetic(txt, ext=false) {
  // 1. filter text, keep only alphabets
  var txt = txt.replace(/[^A-Za-z]/g, '').toLowerCase();
  var dp = 0, d = 0, z = '';
  // 2. get soundex code
  for(var c of txt) {
    // a. get digit
    if(REMOVE9.indexOf(c)>=0) d = 0;
    else if(D19.indexOf(c)>=0) d = 1;
    else if(D29.indexOf(c)>=0) d = 2;
    else if(D39[0]===c || D39[1]===c) d = 3;
    else if(D49===c) d = 4;
    else if(D59[0]===c || D59[1]===c) d = 5;
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
exports.caverphonePhonetic = caverphonePhonetic;
exports.colognePhonetic = colognePhonetic;
exports.metaphonePhonetic = metaphonePhonetic;
exports.mraPhonetic = mraPhonetic;
exports.nysiisPhonetic = nysiisPhonetic;
exports.soundexPhonetic = soundexPhonetic;
exports.soundexSqlPhonetic = soundexSqlPhonetic;
