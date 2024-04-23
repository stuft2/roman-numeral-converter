# Roman Numeral Converter

## Overview

A CLI program and library that converts roman numerals to decimals and decimals to roman numerals.

> *Note* Only converts numbers between 0 and 4000 (exclusive).

## Prerequisites
1. [Install Node.js v16+](https://nodejs.org)
2. Install dependencies: `npm ci`
3. Build distribution files: `npm run build`
4. Link locally `npm link`

## Usage
```sh
$ roman IV
# outputs 4
$ roman 444
# outputs CDXLIV
```

## Development
1. Format the code: `npm run lint:fix`
2. Run the tests: `npm test`
3. Build the distribution code: `npm run build`
