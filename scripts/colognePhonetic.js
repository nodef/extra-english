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
module.exports = colognePhonetic;
