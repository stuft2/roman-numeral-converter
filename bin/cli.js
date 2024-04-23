#!/usr/bin/env node
import meow from 'meow'
import { RomanNumeral } from '../dist/RomanNumeral.js'

const cli = meow(`
\tUsage
\t  $ roman <input>

\tExamples
\t  $ roman IV
\t  # outputs 4
\t  $ roman 444
\t  # outputs CDXLIV
`, {
  importMeta: import.meta
})

const input = cli.input.at(0)
let decimal
/* Ensure the input is an integer */
try {decimal = parseInt(input)} catch (_) {}
try {
  if (decimal != null) {
    console.log(RomanNumeral.parse(decimal).value)
  } else {
    console.log(new RomanNumeral(input).toDecimal())
  }
} catch (e) {
  console.error(e.message)
}
