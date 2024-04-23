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
try {
  const num = parseInt(input) /* Ensure the input is an integer */
  console.log(RomanNumeral.parse(num).value)
} catch (e) {
  console.log(new RomanNumeral(input).toDecimal())
}
