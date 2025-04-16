import {assertEquals} from "jsr:@std/assert";
import {
  caverphonePhonetic,
  colognePhonetic,
  metaphonePhonetic,
  mraPhonetic,
  soundexPhonetic,
  soundexSqlPhonetic,
  lancasterStem,
  porterStem,
} from "./index.ts";




//#region PHONETIC TESTS
Deno.test("Caverphone Phonetic", () => {
  assertEquals(caverphonePhonetic("Thompson"), "TMPSN1");
});


Deno.test("Cologne Phonetic", () => {
  assertEquals(colognePhonetic("Hari"), "7");
});


Deno.test("Metaphone Phonetic", () => {
  assertEquals(metaphonePhonetic("Lightyear"), "LHTYAR");
});


Deno.test("MRA Phonetic", () => {
  assertEquals(mraPhonetic("Byrne"), "BYRN");
});


Deno.test("Soundex Phonetic", () => {
  assertEquals(soundexPhonetic("Tymczak"), "T522");
});


Deno.test("Soundex SQL Phonetic", () => {
  assertEquals(soundexSqlPhonetic("Tymczak"), "T520");
});


// english.nysiisPhonetic('Mackie');
// 'MCY'
//#endregion




//#region WORD STEM TESTS
Deno.test("Lancaster Stem", () => {
  assertEquals(lancasterStem("running"), "run");
});


Deno.test("Porter Stem", () => {
  assertEquals(porterStem("running"), "run");
});
//#endregion
