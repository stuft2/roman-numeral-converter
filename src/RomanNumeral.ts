import {
  DECIMAL_LIST,
  ROMAN_NUMERAL_LIST,
  ROMAN_NUMERAL_SYMBOL,
  ROMAN_NUMERAL_SYMBOL_KIND,
  isRomanNumeralSymbol,
  lookup
} from './Symbols.js'

export class RomanNumeral {
  public readonly value: string
  private readonly groups: Array<keyof typeof ROMAN_NUMERAL_SYMBOL> = []

  /**
    @constructor Parses a series of roman numeral symbols.
    @param value is a series of roman numeral symbols.
    @returns an instance of RomanNumeral.
    @throws {TypeError} for any validation error encountered while parsing.
  */
  constructor (romanNumeral: string) {
    if (romanNumeral === '') {
      throw new TypeError('Invalid numeral')
    }

    let group: keyof typeof ROMAN_NUMERAL_SYMBOL | undefined
    const reversed = romanNumeral.split('').reverse()
    for (const currentSymbol of reversed) {
      if (!isRomanNumeralSymbol(currentSymbol)) {
        /* Each character must be a valid roman numeral symbol */
        throw new TypeError('Invalid numeral')
      }

      if (group == null) {
        /* Quickly continue iterating when a group hasn't been defined yet */
        group = currentSymbol
        continue
      }

      /* Evaluate if the symbol can be grouped with the previous */
      const nextGroup: string = currentSymbol + group
      if (isRomanNumeralSymbol(nextGroup)) {
        /* Continue iterating when the next group is valid */
        group = nextGroup
        continue
      }

      /* When we've found the greatest roman numeral symbol, we consider it a "group" and save it */
      this.groups.push(group)
      /* Set the first numeral of the next grouping */
      group = currentSymbol
    }

    if (group != null) {
      /* Any remaining group that was staged but not saved should be saved */
      this.groups.push(group)
    }

    /* For ensuring only one symbol kind is ever used */
    const counts = {
      [ROMAN_NUMERAL_SYMBOL_KIND.ONES]: 0,
      [ROMAN_NUMERAL_SYMBOL_KIND.TENS]: 0,
      [ROMAN_NUMERAL_SYMBOL_KIND.HUNDREDS]: 0,
      [ROMAN_NUMERAL_SYMBOL_KIND.THOUSANDS]: 0
    }

    for (let i = 0; i < this.groups.length; i++) {
      const currentValue = lookup(ROMAN_NUMERAL_SYMBOL, this.groups[i])
      counts[currentValue.kind]++
      if (counts[currentValue.kind] > 1) {
        /* Enusre that each decimal place is only used once */
        throw new TypeError('Invalid numeral')
      }

      /* Ensure groupings are ordered from smallest to greatest, since we read them in left to right. */
      if (i < this.groups.length - 1) {
        /* If we're at the last element, there's nothing to compare it to */
        const nextValue = lookup(ROMAN_NUMERAL_SYMBOL, this.groups[i + 1])
        if (currentValue.value > nextValue.value) {
          throw new TypeError('Invalid numeral')
        }
      }
    }

    /* Save the entered value, as it's now considered valid */
    this.value = romanNumeral
  }

  /**
    Converts a decimal value to a roman numeral.
    @param value is an integer between 1 and 3999, inclusive.
    @returns an instance of RomanNumeral.
    @throws {TypeError} for any validation error encountered while parsing.
  */
  static parse (value: number): RomanNumeral {
    /* First check lower bound */
    if (value < 1) {
      throw new TypeError('Cannot convert a decimal less than 1 to a Roman numeral')
    }

    /* Then check upper bound */
    if (value > 3999) {
      throw new TypeError('Cannot convert a decimal greater than 3999 to a Roman numeral')
    }

    /* Now convert to roman */
    let converted = ''
    let i = DECIMAL_LIST.length - 1 /* Start at the end of the list and count down */
    while (value > 0) {
      let quotient = Math.floor(value / DECIMAL_LIST[i]) /* The number of times that the decimal fits in the given value */
      value = value % DECIMAL_LIST[i] /* Calculate the remainder */
      while (quotient > 0) {
        /* Add the roman numeral symbol to the end as many times as the quotient */
        converted += ROMAN_NUMERAL_LIST[i]
        quotient--
      }
      i-- /* Go to the next decimal and roman numeral in the list */
    }

    /* Instantiate the RomanNumeral */
    return new RomanNumeral(converted)
  }

  /**
    Converts the roman numeral to a decimal.
    @returns an integer in decimal form.
  */
  toDecimal (): number {
    return this.groups.reduce((sum, group) => {
      return sum + lookup(ROMAN_NUMERAL_SYMBOL, group).value
    }, 0)
  }
}
