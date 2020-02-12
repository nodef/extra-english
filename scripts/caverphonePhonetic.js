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
 * @param {boolean} ext extended Caverphone? (false)
 */
function caverphonePhonetic(txt, ext=false) {
  var t = txt.replace(/[^A-Za-z]/g, '').toLowerCase();
  for(var r of REPLACES)
    t = t.replace(r.p, r.v);
  t = ext? t:(t+'111111').substr(0, 6);
  return t.toUpperCase();
}
module.exports = caverphonePhonetic;
