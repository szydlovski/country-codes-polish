# country-codes-polish

JSON files and ES Modules containing ISO 3166-1 country codes with Polish and English names. All data is scraped from [Wikipedia](https://en.wikipedia.org/wiki/ISO_3166-1).

# Usage
```
npm install country-codes-polish
```
```javascript
const countryCodes = require('country-codes-polish');

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

const countryCodesA2 = require('country-codes-polish/alpha-2');

countryCodesA2.find(({code}) => code === 'DE') =>

{ name_pl: 'Niemcy', name_en: 'Germany', code: 'DE' }

// alpha-3

const countryCodesA3 = require('country-codes-polish/alpha-3');

countryCodesA3.find(({code}) => code === 'DEU') =>

{ name_pl: 'Niemcy', name_en: 'Germany', code: 'DEU' }

// numeric

const countryCodesNum = require('country-codes-polish/numeric');

countryCodesNum.find(({code}) => code === '276') =>

{ name_pl: 'Niemcy', name_en: 'Germany', code: '276' }
```
This package also includes ESM formatted files available as:
```javascript
import countryCodes from 'country-codes-polish/esm';
import countryCodesA2 from 'country-codes-polish/esm/alpha-2';
import countryCodesA3 from 'country-codes-polish/esm/alpha-3';
import countryCodesNum from 'country-codes-polish/esm/numeric';
```
# Scrape it yourself

1. Clone this repo
2. Run `npm install`
3. Run `npm run scrape`.

# CHANGELOG

## 0.1.2 - 2020-12-28

### Changed

- JSON files are pretty-printed.

## 0.1.1 - 2020-12-28

### Fixed

- Removing Wikipedia references in scraped strings