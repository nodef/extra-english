[English] is a West Germanic language, first spoken in early medieval England. This package is a collection of various English language utilities. It includes functions for converting text to phonetic representations and stemming words.

▌
📦 [JSR](https://jsr.io/@nodef/extra-english),
📰 [Docs](https://jsr.io/@nodef/extra-english/doc),

<br>


```typescript
import * as xenglish from "jsr:@nodef/extra-english";

//# Phonetic functions
xenglish.caverphonePhonetic('Thompson', true);
// → 'TMPSN1'

xenglish.colognePhonetic('Hari');
// → '7'

xenglish.metaphonePhonetic('Lightyear');
// → 'LHTYAR'

xenglish.mraPhonetic('Byrne');
// → 'BYRN'

xenglish.soundexPhonetic('Tymczak');
// → 'T522'

xenglish.soundexSqlPhonetic('Tymczak');
// → 'T520'


//# Stemming functions
xenglish.lancasterStem('running');
// → 'run'

xenglish.porterStem('running');
// → 'run'
```


### Index

| Name                         | Action
|------------------------------|-------
| [caverphonePhonetic]         | Get Caverphone phonetic of English text.
| [colognePhonetic]            | Get Cologne phonetic of English text.
| [metaphonePhonetic]          | Get Metaphone phonetic of English text.
| [mraPhonetic]                | Get Match Rating Approach phonetic of English text.
| [soundexPhonetic]            | Get Soundex phonetic of English text.
| [soundexSqlPhonetic]         | Get Soundex phonetic (SQL) of English text.
| [lancasterStem]              | Stem a word to its base form using the Lancaster stemmer.
| [porterStem]                 | Stem a word to its base form using the Porter stemmer.
<!-- | [nysiisPhonetic]             | Get NYSIIS phonetic of English text. -->

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
[English]: https://en.wikipedia.org/wiki/English_language
