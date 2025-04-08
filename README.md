[English] is a West Germanic language, first spoken in early medieval England.
Includes various name to phonetic representation algorithms.

```javascript
const english = require('extra-english');

english.caverphonePhonetic('Thompson', true);
// 'TMPSN'

english.colognePhonetic('Hari');
// '7'

english.metaphonePhonetic('Lightyear');
// 'LHTYAR'

english.nysiisPhonetic('Mackie');
// 'MCY'
```

### reference

| Name                         | Action
|------------------------------|-------
| [caverphonePhonetic]         | Gets Caverphone phonetic of english text.
| [colognePhonetic]            | Gets Cologne phonetic of english text.
| [metaphonePhonetic]          | Gets Metaphone phonetic of english text.
| [mraPhonetic]                | Gets Match Rating Approach phonetic of english text.
| [nysiisPhonetic]             | Gets NYSIIS phonetic of english text.
| [soundexPhonetic]            | Gets Soundex phonetic of english text.
| [soundexSqlPhonetic]         | Gets Soundex phonetic (SQL) of english text.

<br>
<br>

[![nodef](https://merferry.glitch.me/card/extra-english.svg)](https://nodef.github.io)
![](https://ga-beacon.deno.dev/G-RC63DPBH3P:SH3Eq-NoQ9mwgYeHWxu7cw/github.com/nodef/extra-english)

[caverphonePhonetic]: https://github.com/nodef/extra-english/wiki/caverphonePhonetic
[colognePhonetic]: https://github.com/nodef/extra-english/wiki/colognePhonetic
[metaphonePhonetic]: https://github.com/nodef/extra-english/wiki/metaphonePhonetic
[mraPhonetic]: https://github.com/nodef/extra-english/wiki/mraPhonetic
[nysiisPhonetic]: https://github.com/nodef/extra-english/wiki/nysiisPhonetic
[soundexPhonetic]: https://github.com/nodef/extra-english/wiki/soundexPhonetic
[soundexSqlPhonetic]: https://github.com/nodef/extra-english/wiki/soundexSqlPhonetic
[English]: https://en.wikipedia.org/wiki/English_language
