[English] is a West Germanic language, first spoken in early medieval England.

▌
📦 [JSR](https://jsr.io/@nodef/extra-english),
📦 [NPM](https://www.npmjs.com/package/@nodef/extra-english),
🌐 [Web](https://cdn.jsdelivr.net/npm/@nodef/extra-english.web),
📰 [Docs](https://jsr.io/@nodef/extra-english/doc).

This package is a **single flat module** that collects various English language
utilities. Following a naming convention common to this family of packages,
**phonetic functions** are suffixed with `Phonetic`, and **stemming functions**
are suffixed with `Stem`. All phonetic functions return an **uppercase** code;
stemmers return a **lowercase** word.

The methods are:

- **Phonetic algorithms**: [`caverphonePhonetic()`], [`colognePhonetic()`],
  [`metaphonePhonetic()`], [`mraPhonetic()`], [`soundexPhonetic()`], and
  [`soundexSqlPhonetic()`].
- **Stemmers**: [`lancasterStem()`] and [`porterStem()`].

[English]: https://en.wikipedia.org/wiki/English_language
[`caverphonePhonetic()`]: #caverphonephonetic
[`colognePhonetic()`]: #colognephonetic
[`metaphonePhonetic()`]: #metaphonephonetic
[`mraPhonetic()`]: #mraphonetic
[`soundexPhonetic()`]: #soundexphonetic
[`soundexSqlPhonetic()`]: #soundexsqlphonetic
[`lancasterStem()`]: #lancasterstem
[`porterStem()`]: #porterstem

<br>

```ts
import * as xenglish from "jsr:@nodef/extra-english";


// 1. Phonetic algorithms.
xenglish.caverphonePhonetic("Thompson", true);   // → "TMPSN1"
xenglish.colognePhonetic("Hari");                // → "7"
xenglish.metaphonePhonetic("Lightyear");         // → "LHTYAR"
xenglish.mraPhonetic("Byrne");                   // → "BYRN"
xenglish.soundexPhonetic("Tymczak");             // → "T522"
xenglish.soundexSqlPhonetic("Tymczak");          // → "T520"


// 2. Stemming.
xenglish.lancasterStem("running");               // → "run"
xenglish.porterStem("running");                  // → "run"
```

<br>
<br>


## Index

| Property | Description |
|  ----  |  ----  |
| [caverphonePhonetic] | Get the Caverphone phonetic code of English text. |
| [colognePhonetic] | Get the Cologne phonetic code of English text. |
| [metaphonePhonetic] | Get the Metaphone phonetic code of English text. |
| [mraPhonetic] | Get the Match Rating Approach (MRA) phonetic code of English text. |
| [soundexPhonetic] | Get the (NARA) Soundex phonetic code of English text. |
| [soundexSqlPhonetic] | Get the (SQL) Soundex phonetic code of English text. |
| [lancasterStem] | Stem a word using the Lancaster stemmer. |
| [porterStem] | Stem a word using the Porter stemmer. |

<!-- | [nysiisPhonetic] | Get the NYSIIS phonetic code of English text. (not yet implemented) | -->

<br>
<br>


## Reference

### caverphonePhonetic

```ts
function caverphonePhonetic(txt: string, ext = false): string;
```

Returns the Caverphone phonetic code of `txt`. Non-alphabetic characters are
removed, and the text is lowercased before the replacement rules are applied.
By default the **normal** (6-digit) form is returned; pass `ext = true` for
the **extended** Caverphone form.

```ts
caverphonePhonetic("Thompson", true);  // "TMPSN1"
```

### colognePhonetic

```ts
function colognePhonetic(txt: string): string;
```

Returns the Cologne phonetic code of `txt`. Non-alphabetic characters are
removed, the text is uppercased, and the German characters `Ä`, `Ö`, `Ü`, `ß`
are treated as `A`. The result is a string of digits in `0`–`8`.

```ts
colognePhonetic("Hari");  // "7"
```

### metaphonePhonetic

```ts
function metaphonePhonetic(txt: string): string;
```

Returns the Metaphone phonetic code of `txt`. Non-alphabetic characters are
removed, and the text is uppercased before the replacement rules are applied.

```ts
metaphonePhonetic("Lightyear");  // "LHTYAR"
```

### mraPhonetic

```ts
function mraPhonetic(txt: string, ext = false): string;
```

Returns the Match Rating Approach (MRA) phonetic code of `txt`. Non-alphabetic
characters are removed, the text is uppercased, and vowels (except the first
letter) as well as duplicate runs are dropped. By default the result is
**reduced** to 6 characters (first three + last three); pass `ext = true` to
get the **full** (non-reduced) code.

```ts
mraPhonetic("Byrne");  // "BYRN"
```

### soundexPhonetic

```ts
function soundexPhonetic(txt: string, ext = false): string;
```

Returns the (NARA) Soundex phonetic code of `txt`. By default a **4-character**
code (letter + 3 digits) is returned; pass `ext = true` to get the **extended**
code without truncation.

```ts
soundexPhonetic("Tymczak");  // "T522"
```

> The NARA variant and the SQL variant differ in how they treat vowels and
> adjacent consonants. They are provided as separate functions because the two
> conventions are not interchangeable.

### soundexSqlPhonetic

```ts
function soundexSqlPhonetic(txt: string, ext = false): string;
```

Returns the (SQL) Soundex phonetic code of `txt`. By default a **4-character**
code is returned; pass `ext = true` to get the **extended** code.

```ts
soundexSqlPhonetic("Tymczak");  // "T520"
```

### lancasterStem

```ts
function lancasterStem(word: string): string;
```

Stems `word` using the Lancaster (Paice/Husk) stemmer. Rules are applied
recursively until no further rule matches. The input is lowercased first.

```ts
lancasterStem("running");  // "run"
```

### porterStem

```ts
function porterStem(word: string): string;
```

Stems `word` using the Porter stemmer. Non-alphabetic characters are removed,
and the word is lowercased. Words shorter than 3 characters are returned
unchanged.

```ts
porterStem("running");  // "run"
```

<br>
<br>


## Story

The **English language** is a *West Germanic* language that originated in
*early medieval England*. Over centuries it has borrowed heavily from *Latin*,
*French*, and *Old Norse*, which is exactly why English spelling is famously
*irregular*: the letter `c` sounds like `k`, `s`, or `ʃ` depending on the word,
and `gh` is *silent* in `night` but a `f` in `laugh`. This makes it hard to
search, index, or match words by their pronunciation.

**Phonetic algorithms** solve this by mapping *words* to short *codes* that
reflect how they *sound*, so that `Smith` and `Smyth` produce the same (or
similar) code. They differ in origin and trade-offs:

- **Caverphone** was designed for *New Zealand English* and yields a fixed
  6-character code.
- **Cologne** (Kölner Phonetik) was designed for *German*, and yields a numeric
  code; it is included here because it works reasonably well on English names.
- **Metaphone** is a *variable-length* code based on *English* pronunciation
  rules, and is generally more accurate than Soundex.
- **Match Rating Approach (MRA)** is a *comparison* algorithm: it reduces two
  names to short codes and measures how closely they agree.
- **Soundex** is the classic *4-character* code from the *US National Archives*
  (NARA), with a widely used *SQL* variant that differs in how it treats
  vowels and repeated consonants.

**Stemmers**, on the other hand, reduce *inflected words* to their *base form*
so that `running`, `runs`, and `ran` can be indexed under the same key:

- **Lancaster** (Paice/Husk) is *aggressive* — it tends to over-stem — but is
  extremely fast.
- **Porter** is *conservative* and more accurate on real English words, at the
  cost of a slightly larger rule table.

<br>
<br>


## See also

- [Caverphone](https://en.wikipedia.org/wiki/Caverphone)
- [Cologne phonetics](https://en.wikipedia.org/wiki/Cologne_phonetics)
- [Metaphone](https://en.wikipedia.org/wiki/Metaphone)
- [Match Rating Approach](https://en.wikipedia.org/wiki/Match_rating_approach)
- [Soundex](https://en.wikipedia.org/wiki/Soundex)
- [Stemming](https://en.wikipedia.org/wiki/Stemming)
- [Lancaster (Paice/Husk) stemmer](https://www.comp.lancs.ac.uk/computing/research/stemming/)
- [Porter stemmer](https://tartarus.org/martin/PorterStemmer/)
- [RegExr](https://regexr.com)

<br>
<br>

[![](https://raw.githubusercontent.com/qb40/designs/gh-pages/0/image/11.png)](https://wolfram77.github.io)<br>
[![ORG](https://img.shields.io/badge/org-nodef-green?logo=Org)](https://nodef.github.io)
![](https://ga-beacon.deno.dev/G-RC63DPBH3P:SH3Eq-NoQ9mwgYeHWxu7cw/github.com/nodef/extra-english)


[caverphonePhonetic]: https://jsr.io/@nodef/extra-english/doc/~/caverphonePhonetic
[colognePhonetic]: https://jsr.io/@nodef/extra-english/doc/~/colognePhonetic
[metaphonePhonetic]: https://jsr.io/@nodef/extra-english/doc/~/metaphonePhonetic
[mraPhonetic]: https://jsr.io/@nodef/extra-english/doc/~/mraPhonetic
[nysiisPhonetic]: https://jsr.io/@nodef/extra-english/doc/~/nysiisPhonetic
[soundexPhonetic]: https://jsr.io/@nodef/extra-english/doc/~/soundexPhonetic
[soundexSqlPhonetic]: https://jsr.io/@nodef/extra-english/doc/~/soundexSqlPhonetic
[lancasterStem]: https://jsr.io/@nodef/extra-english/doc/~/lancasterStem
[porterStem]: https://jsr.io/@nodef/extra-english/doc/~/porterStem
