//#region CAVERPHONE PHONETIC
/** Replace rules for Caverphone phonetic algorithm. */
const RCAVERPHONE = [
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
 * Get Caverphone phonetic of English text.
 * @param txt english text
 * @param ext extended caverphone? [false]
 * @returns caverphone phonetic string
 */
export function caverphonePhonetic(txt: string, ext=false): string {
  let t = txt.replace(/[^A-Za-z]/g, '').toLowerCase();
  for (const r of RCAVERPHONE)
    t = t.replace(r.p, r.v);
  t = ext? t : (t + '111111').substring(0, 6);
  return t.toUpperCase();
}
//#endregion




//#region COLOGNE PHONETIC
/**
 * Represents a handler function for Cologne phonetic algorithm.
 * @param nextChar next character in the string
 * @param prevChar previous character in the string
 * @param isFirst is the current character the first character?
 * @returns the cologne phonetic code for the character
 */
type FCologne = (nextChar: string, prevChar: string, isFirst: boolean) => string;

// Cologne phonetic algorithm handlers.
const FAEIJOUY: FCologne = () => '0';
const FH:       FCologne = () => '';
const FB:       FCologne = () => '1';
const FP:       FCologne = (b) => b!=='H'? '1':'3';
const FDT:      FCologne = (b) => 'CSZ'.indexOf(b)<0? '2':'8';
const FFVW:     FCologne = () => '3';
const FGKQ:     FCologne = () => '4';
const FC:       FCologne = (b, a, i) => (i && 'AHKLOQRUX'.indexOf(b) >= 0) || ('AHKOQUX'.indexOf(b) >= 0 && 'SZ'.indexOf(a) < 0)? '4' : '8';
const FX:       FCologne = (_b, a) => 'CKQ'.indexOf(a)<0? '48':'8';
const FL:       FCologne = () => '5';
const FMN:      FCologne = () => '6';
const FR:       FCologne = () => '7';
const FSZ:      FCologne = () => '8';

/** Cologne phonetic algorithm table. */
const RCOLOGNE = new Map<string, FCologne>([
  ['A', FAEIJOUY],
  ['B', FB],
  ['C', FC],
  ['D', FDT],
  ['E', FAEIJOUY],
  ['F', FFVW],
  ['G', FGKQ],
  ['H', FH],
  ['I', FAEIJOUY],
  ['J', FAEIJOUY],
  ['K', FGKQ],
  ['L', FL],
  ['M', FMN],
  ['N', FMN],
  ['O', FAEIJOUY],
  ['P', FP],
  ['Q', FGKQ],
  ['R', FR],
  ['S', FSZ],
  ['T', FDT],
  ['U', FAEIJOUY],
  ['V', FFVW],
  ['W', FFVW],
  ['X', FX],
  ['Y', FAEIJOUY],
  ['Z', FSZ],
]);


/**
 * Get Cologne phonetic of English text.
 * @param txt english text
 * @returns cologne phonetic string
 */
export function colognePhonetic(txt: string): string {
  const t = txt.replace(/[^A-Za-z]/g, '').toUpperCase().replace(/[ÄÖÜß]/g, 'A');
  let a = (RCOLOGNE.get(t[0]) as FCologne)(t[1], ' ', true);
  for (let i=1, I=t.length, pc=a; i<I; i++) {
    const c = (RCOLOGNE.get(t[i]) as FCologne)(t[i+1], t[i-1], i===0);
    if (c!==pc && c!=='0') a += c;
    pc = c;
  }
  return a;
}
//#endregion




//#region METAPHONE PHONETIC
/** Replace rules for Metaphone phonetic algorithm. */
const RMETAPHONE = [
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
 * Get Metaphone phonetic of English text.
 * @param txt english text
 * @returns metaphone phonetic string
 */
export function metaphonePhonetic(txt: string): string {
  let a = txt.replace(/[^A-Za-z]/g, '').toUpperCase();
  for (const r of RMETAPHONE)
    a = a.replace(r.p, r.v);
  return a;
}
//#endregion




//#region MRA PHONETIC
/**
 * Get Match Rating Approach (MRA) phonetic of English text.
 * @param txt english text
 * @param ext extended MRA? [false]
 * @returns MRA phonetic string
 */
export function mraPhonetic(txt: string, ext=false): string {
  let t = txt.replace(/[^A-Za-z]/g, '').toUpperCase();
  t = (t[0] + t.substring(1).replace(/[AEIOU]/g, '')).replace(/(.)\1+/g, '$1');
  return ext || t.length <= 6? t : t.substring(0, 3) + t.substring(t.length - 3);
}
//#endregion




//#region NYSIIS PHONETIC
//#endregion




//#region SOUNDEX PHONETIC
// Soundex phonetic algorithm constants.
const SXVOWEL  = 'aeiouy';
const SXREMOVE = 'aeiouyhw';
const SXD1 = 'bfpv';
const SXD2 = 'cgjkqsxz';
const SXD3 = 'dt';
const SXD4 = 'l';
const SXD5 = 'mn';
// const SXD6 = 'r';


/**
 * Get Soundex phonetic of English text.
 * @param txt english text
 * @param ext extended soundex? [false]
 * @returns soundex phonetic string
 */
export function soundexPhonetic(txt: string, ext=false): string {
  // 1. Filter text, keep only alphabets.
  txt = txt.replace(/[^A-Za-z]/g, '').toLowerCase();
  let dp = 0, d = 0, v = false, a = '';
  // 2. Get soundex code.
  for (const c of txt) {
    // a. Get digit.
    if (SXREMOVE.indexOf(c)  >= 0) d = 0;
    else if (SXD1.indexOf(c) >= 0) d = 1;
    else if (SXD2.indexOf(c) >= 0) d = 2;
    else if (SXD3[0]===c || SXD3[1]===c) d = 3;
    else if (SXD4===c) d = 4;
    else if (SXD5[0]===c || SXD5[1]===c) d = 5;
    else d = 6;
    // b. Update code.
    if (!a.length) a += c.toUpperCase();
    else if (d && (d!==dp || v)) a += d;
    // c. Track vowel, previous digit.
    v = d? false : (v || SXVOWEL.indexOf(c) >= 0);
    dp = d? d : dp;
  }
  // 3. Return normal/extended code.
  const l = a.length;
  if (ext || !l) return a;
  if (l < 4) return a+'000'.substring(0, 4-l);
  return a.substring(0, 4);
}
//#endregion




//#region SOUNDEX SQL PHONETIC
// Soundex SQL phonetic algorithm constants.
const SSREMOVE = 'aeiouyhw';
const SSD1 = 'bfpv';
const SSD2 = 'cgjkqsxz';
const SSD3 = 'dt';
const SSD4 = 'l';
const SSD5 = 'mn';
// const SSD6 = 'r';


/**
 * Get Soundex phonetic (SQL) of English text.
 * @param txt english text
 * @param ext extended soundex? [false]
 * @returns soundex phonetic (SQL) string
 */
export function soundexSqlPhonetic(txt: string, ext=false): string {
  // 1. Filter text, keep only alphabets.
  txt = txt.replace(/[^A-Za-z]/g, '').toLowerCase();
  let dp = 0, d = 0, a = '';
  // 2. Get soundex code.
  for (const c of txt) {
    // a. Get digit.
    if (SSREMOVE.indexOf(c)  >= 0) d = 0;
    else if (SSD1.indexOf(c) >= 0) d = 1;
    else if (SSD2.indexOf(c) >= 0) d = 2;
    else if (SSD3[0]===c || SSD3[1]===c) d = 3;
    else if (SSD4===c) d = 4;
    else if (SSD5[0]===c || SSD5[1]===c) d = 5;
    else d = 6;
    // b. Update code.
    if (!a.length) a += c.toUpperCase();
    else if (d && d!==dp) a += d;
    if (d) dp = d;
  }
  // 3. Return normal/extended code.
  const l = a.length;
  if (ext || !l) return a;
  if (l < 4) return a + '000'.substring(0, 4-l);
  return a.substring(0, 4);
}
//#endregion




//#region LANCASTER STEM
/** Represents a replacement rule for the Lancaster stemmer. */
interface LSRule {
  /** Suffix to be replaced. */
  s: string;
  /** Replacement string. */
  r: string;
  /** Minimum length of the stemmed word. */
  l?: number;
  /** Check if the stemmed word contains a vowel. */
  v?: boolean;
};


/** Replace rules for the Lancaster stemmer. */
const LSRULES: LSRule[] = [
  { s: 'ational', r: 'ate' },
  { s: 'tional',  r: 'tion' },
  { s: 'fulness', r: 'ful' },
  { s: 'ousness', r: 'ous' },
  { s: 'iveness', r: 'ive' },
  { s: 'ization', r: 'ize' },
  { s: 'isation', r: 'ize' },
  { s: 'biliti',  r: 'ble' },
  { s: 'lessli',  r: 'less' },
  { s: 'entli',   r: 'ent' },
  { s: 'ation',   r: 'ate' },
  { s: 'ator',    r: 'ate' },
  { s: 'alism',   r: 'al' },
  { s: 'aliti',   r: 'al' },
  { s: 'ousli',   r: 'ous' },
  { s: 'iviti',   r: 'ive' },
  { s: 'fulli',   r: 'ful' },
  { s: 'enci',    r: 'ence' },
  { s: 'anci',    r: 'ance' },
  { s: 'abli',    r: 'able' },
  { s: 'izer',    r: 'ize' },
  { s: 'iser',    r: 'ise' },
  { s: 'alli',    r: 'al' },
  { s: 'ical',    r: 'ic' },
  { s: 'ement',   r: '' },
  { s: 'ance',    r: '' },
  { s: 'ence',    r: '' },
  { s: 'able',    r: '' },
  { s: 'ible',    r: '' },
  { s: 'ment',    r: '' },
  { s: 'ness',    r: '' },
  { s: 'ful',     r: '' },
  { s: 'ous',     r: '' },
  { s: 'ive',     r: '' },
  { s: 'ize',     r: '' },
  { s: 'ise',     r: '' },
  { s: 'ing',     r: '',  l: 4, v: true },
  { s: 'ed',      r: '',  l: 3, v: true },
  { s: 'es',      r: 'e', l: 3 },
  { s: 'es',      r: '',  l: 3, v: true },
  { s: 'ly',      r: '',  l: 3 },
  { s: 'li',      r: '',  l: 3 },
  { s: 'ti',      r: 't', l: 3 },
  { s: 'ci',      r: 'c', l: 3 },
  { s: 'gi',      r: 'g', l: 3 },
  { s: 'si',      r: 's', l: 3 },
  { s: 'zi',      r: 'z', l: 3 },
  { s: 's',       r: '',  l: 2 },
  { s: 'e',       r: '',  l: 3 },
  { s: 'bb',      r: 'b', l: 3, v: true },
  { s: 'dd',      r: 'd', l: 3, v: true },
  { s: 'ff',      r: 'f', l: 3, v: true },
  { s: 'gg',      r: 'g', l: 3, v: true },
  { s: 'll',      r: 'l', l: 3, v: true },
  { s: 'mm',      r: 'm', l: 3, v: true },
  { s: 'nn',      r: 'n', l: 3, v: true },
  { s: 'pp',      r: 'p', l: 3, v: true },
  { s: 'rr',      r: 'r', l: 3, v: true },
  { s: 'ss',      r: 's', l: 3, v: true },
  { s: 'tt',      r: 't', l: 3, v: true },
  { s: 'zz',      r: 'z', l: 3, v: true },
  { s: 'i',       r: '',  l: 3, v: true },
  { s: 'ant',     r: '' },
  { s: 'ent',     r: '' },
  { s: 'ism',     r: '' },
  { s: 'ist',     r: '' },
  { s: 'er',      r: '',  l: 3 },
  { s: 'or',      r: '',  l: 3 },
  { s: 'al',      r: '',  l: 3 },
  { s: 'ic',      r: '',  l: 3 },
  { s: 'at',      r: '',  l: 3 },
  { s: 'en',      r: '',  l: 3 },
  { s: 'um',      r: '',  l: 3 },
  { s: 'us',      r: '',  l: 3 },
  { s: 'on',      r: '',  l: 3 },
  { s: 'ar',      r: '',  l: 3 },
  { s: 'el',      r: '',  l: 3 },
  { s: 'em',      r: '',  l: 3 },
  { s: 'in',      r: '',  l: 3 },
  { s: 'it',      r: '',  l: 3 },
  { s: 'ol',      r: '',  l: 3 },
  { s: 'op',      r: '',  l: 3 },
  { s: 'ot',      r: '',  l: 3 },
  { s: 'un',      r: '',  l: 3 },
  { s: 'up',      r: '',  l: 3 },
  { s: 'ur',      r: '',  l: 3 },
  { s: 'ut',      r: '',  l: 3 },
  { s: 'ct',      r: 'c', l: 3 },
  { s: 'lt',      r: 'l', l: 3 },
  { s: 'nt',      r: 'n', l: 3 },
  { s: 'pt',      r: 'p', l: 3 },
  { s: 'rt',      r: 'r', l: 3 },
  { s: 'st',      r: 's', l: 3 },
  { s: 'xt',      r: 'x', l: 3 },
  { s: 'y',       r: '',  l: 3, v: true }
];


/**
 * Check if a word contains at least one vowel.
 * @param word word to be checked
 * @returns true if the word contains a vowel, false otherwise
 */
function hasVowel(word: string): boolean {
  return /[aeiouy]/.test(word);
}


/**
 * Stem a word to its base form using the Lancaster stemmer.
 * @param word word to be stemmed
 * @returns stemmed word
 */
export function lancasterStem(word: string): string {
  if (!word) return '';
  const w = word.toLowerCase();
  for (const r of LSRULES) {
    if (!w.endsWith(r.s)) continue;
    const base = w.slice(0, -r.s.length) + r.r;
    if (r.l && base.length < r.l) continue;
    if (r.v && !hasVowel(base)) continue;
    // Recursively stem again if further changes are possible.
    return lancasterStem(base);
  }
  return w;
}
//#endregion




//#region PORTER STEM
/** Step 2 replacements for the Porter stemmer. */
const PSREPLACE2: Array<[string, string]> = [
  ['ational', 'ate'],
  ['tional',  'tion'],
  ['enci',    'ence'],
  ['anci',    'ance'],
  ['izer',    'ize'],
  ['abli',    'able'],
  ['alli',    'al'],
  ['entli',   'ent'],
  ['eli',     'e'],
  ['ousli',   'ous'],
  ['ization', 'ize'],
  ['ation',   'ate'],
  ['ator',    'ate'],
  ['alism',   'al'],
  ['iveness', 'ive'],
  ['fulness', 'ful'],
  ['ousness', 'ous'],
  ['aliti',   'al'],
  ['iviti',   'ive'],
  ['biliti',  'ble'],
];


/** Step 3 replacements for the Porter stemmer. */
const PSREPLACE3: Array<[string, string]> = [
  ['icate', 'ic'],
  ['ative', ''],
  ['alize', 'al'],
  ['iciti', 'ic'],
  ['ical',  'ic'],
  ['ful',   ''],
  ['ness',  ''],
];


/** Step 4 suffixes for the Porter stemmer. */
const PSSUFFIXES4 = [
  'al',
  'ance',
  'ence',
  'er',
  'ic',
  'able',
  'ible',
  'ant',
  'ement',
  'ment',
  'ent',
  'ion',
  'ou',
  'ism',
  'ate',
  'iti',
  'ous',
  'ive',
  'ize',
];


/**
 * Test whether the letter at position i is a consonant.
 * @param w word to be processed
 * @param i position of the letter in the word
 * @returns true if the letter is a consonant, false otherwise
 */
function isConsonant(w: string, i: number): boolean {
  if ("aeiou".includes(w[i])) return false;
  // 'y' is a consonant unless preceded by a vowel.
  if (w[i]==="y") return i===0? true : !isConsonant(w, i-1);
  return true;
}


/**
 * Test whether the word contains a vowel.
 * @param w word to be processed
 * @returns true if the word contains a vowel, false otherwise
 */
function containsVowel(w: string): boolean {
  for (let i=0; i<w.length; i++)
    if (!isConsonant(w, i)) return true;
  return false;
}


/**
 * Test whether the word ends with a double consonant.
 * @param w word to be processed
 * @returns true if the word ends with a double consonant, false otherwise
 */
function endsWithDoubleConsonant(w: string): boolean {
  const W = w.length;
  if (W<2) return false;
  return w[W-1] === w[W-2] && isConsonant(w, W-1);
}


/**
 * Compute the VC measure of a word.
 * @param w word to be processed
 * @returns count of VC sequences in the word
 */
function measureVC(w: string): number {
  let m = 0, f = false;
  for (let i=0; i<w.length; i++) {
    // We enter a vowel segment.
    if (!isConsonant(w, i)) f = true;
    // Transition from vowel to consonant increases the count.
    else if (f) { m++; f = false; }
  }
  return m;
}


/**
 * Check if the word ends with a consonant-vowel-consonant pattern.
 * @param w word to be processed
 * @param i position of the letter in the word
 * @returns true if the word ends with a CVC pattern, false otherwise
 */
function endsWithCVC(w: string, i: number): boolean {
  if (i < 2) return false;
  if (!isConsonant(w, i) || isConsonant(w, i-1) || !isConsonant(w, i-2)) return false;
  return !"wxy".includes(w[i]);
}


/**
 * Stem a word to its base form using the Porter stemmer.
 * @param word word to be stemmed
 * @returns stemmed word
 */
export function porterStem(word: string): string {
  let w = word.toLowerCase().replace(/[^a-z]/g, '');
  if (w.length < 3) return w;
  // 1a. Deal with plurals and -ed, -ing endings.
  if (w.endsWith("sses"))     w = w.slice(0, -2);
  else if (w.endsWith("ies")) w = w.slice(0, -2);
  else if (w.endsWith("ss")) { /* Ignore */ }
  else if (w.endsWith("s")) w = w.slice(0, -1);
  // 1b. Remove -ed and -ing where appropriate.
  if (w.endsWith("eed")) {
    // If the stem (w without "eed") has m > 0, replace "eed" with "ee".
    const base = w.slice(0, -3);
    if (measureVC(w) > 0) w = base + "ee";
  }
  else if ((w.endsWith("ed")  && containsVowel(w.slice(0, -2))) ||
           (w.endsWith("ing") && containsVowel(w.slice(0, -3)))) {
    // Remove "ed" or "ing" suffix.
    w = w.endsWith("ed")? w.slice(0, w.length - 2) : w.slice(0, w.length - 3);
    // Special handling for endings after removal.
    if (w.endsWith("at") || w.endsWith("bl") || w.endsWith("iz")) w += "e";
    else if (endsWithDoubleConsonant(w) && !"lsz".includes(w[w.length - 1])) w = w.slice(0, -1);
    else if (measureVC(w) === 1 && endsWithCVC(w, w.length-1)) w += "e";
  }
  // 1c. Replace terminal 'y' with 'i' if there is a vowel in the stem.
  if (w.endsWith("y") && containsVowel(w)) w = w.slice(0, -1) + "i";
  // 2. Replace double-suffixes with single ones.
  for (const [suffix, replacement] of PSREPLACE2) {
    if (!w.endsWith(suffix)) continue;
    const base = w.slice(0, w.length - suffix.length);
    if (measureVC(w) > 0) w = base + replacement;
    break;
  }
  // 3. Further suffix stripping.
  for (const [suffix, replacement] of PSREPLACE3) {
    if (!w.endsWith(suffix)) continue;
    const base = w.slice(0, w.length - suffix.length);
    if (measureVC(w) > 0) w = base + replacement;
    break;
  }
  // 4. Remove certain suffixes if measure > 1.
  for (const suffix of PSSUFFIXES4) {
    if (!w.endsWith(suffix)) continue;
    const base = w.slice(0, w.length - suffix.length);
    // Special check for "ion": the stem must end with s or t.
    if (measureVC(w) > 1 && (suffix!=="ion" || (base.endsWith("s") || base.endsWith("t")))) w = base;
    break;
  }
  // 5. Clean up the ending.
  // Remove a trailing "e" if measure>1, or measure===1 but not cvc.
  if (w.endsWith("e")) {
    const m = measureVC(w);
    if (m> 1 || (m=== 1 && !endsWithCVC(w, w.length - 2))) w = w.slice(0, -1);
  }
  // If the word ends with "ll" and measure>1, reduce it to single "l".
  if (w.endsWith("ll") && measureVC(w)>1) w = w.slice(0, -1);
  return w;
}
//#endregion
