# polish-iso-3166-1

JSON files and ES Modules containing ISO 3166-1 country codes with Polish and English names. All data is parsed from [Wikipedia](https://en.wikipedia.org/wiki/ISO_3166-1).

# Usage
```
npm install polish-iso-3166-1
```
```javascript
const countryCodes = require('polish-iso-3166-1');

countryCodes.find(({name_en}) => name_en === 'Germany') =>

{
  name_pl: 'Niemcy',
  name_en: 'Germany',
  alpha_2: 'DE',
  alpha_3: 'DEU',
  numeric: '276'
}

// each of the three code variants are included as separate files as well
// in these files, the target code is set as the `code` property

// alpha-2

const countryCodesA2 = require('polish-iso-3166-1/alpha-2');

countryCodesA2.find(({code}) => code === 'DE') =>

{ name_pl: 'Niemcy', name_en: 'Germany', code: 'DE' }

// alpha-3

const countryCodesA3 = require('polish-iso-3166-1/alpha-3');

countryCodesA3.find(({code}) => code === 'DEU') =>

{ name_pl: 'Niemcy', name_en: 'Germany', code: 'DEU' }

// numeric

const countryCodesNum = require('polish-iso-3166-1/numeric');

countryCodesNum.find(({code}) => code === '276') =>

{ name_pl: 'Niemcy', name_en: 'Germany', code: '276' }
```
There are also ESM formatted files available as:
```javascript
import countryCodes from 'polish-iso-3166-1/esm';
import countryCodesA2 from 'polish-iso-3166-1/esm/alpha-2';
import countryCodesA3 from 'polish-iso-3166-1/esm/alpha-3';
import countryCodesNum from 'polish-iso-3166-1/esm/numeric';
```
# Scrape it yourself

Clone this repo, run `npm install`, then `npm run scrape`.