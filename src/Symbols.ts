export const DECIMAL_LIST = [1, 4, 5, 9, 10, 40, 50, 90, 100, 400, 500, 900, 1000]

export const ROMAN_NUMERAL_LIST = ['I', 'IV', 'V', 'IX', 'X', 'XL', 'L', 'XC', 'L', 'CD', 'D', 'CM', 'M']

export enum ROMAN_NUMERAL_SYMBOL_KIND { ONES = 'ones', TENS = 'tens', HUNDREDS = 'hundreds', THOUSANDS = 'thousands' }

const ROMAN_NUMERAL_UNITS_SYMBOL = {
  I: { value: 1, kind: ROMAN_NUMERAL_SYMBOL_KIND.ONES },
  II: { value: 2, kind: ROMAN_NUMERAL_SYMBOL_KIND.ONES },
  III: { value: 3, kind: ROMAN_NUMERAL_SYMBOL_KIND.ONES },
  IV: { value: 4, kind: ROMAN_NUMERAL_SYMBOL_KIND.ONES },
  V: { value: 5, kind: ROMAN_NUMERAL_SYMBOL_KIND.ONES },
  VI: { value: 6, kind: ROMAN_NUMERAL_SYMBOL_KIND.ONES },
  VII: { value: 7, kind: ROMAN_NUMERAL_SYMBOL_KIND.ONES },
  VIII: { value: 8, kind: ROMAN_NUMERAL_SYMBOL_KIND.ONES },
  IX: { value: 9, kind: ROMAN_NUMERAL_SYMBOL_KIND.ONES }
} as const

const ROMAN_NUMERAL_TENS_SYMBOL = {
  X: { value: 10, kind: ROMAN_NUMERAL_SYMBOL_KIND.TENS },
  XX: { value: 20, kind: ROMAN_NUMERAL_SYMBOL_KIND.TENS },
  XXX: { value: 30, kind: ROMAN_NUMERAL_SYMBOL_KIND.TENS },
  XL: { value: 40, kind: ROMAN_NUMERAL_SYMBOL_KIND.TENS },
  L: { value: 50, kind: ROMAN_NUMERAL_SYMBOL_KIND.TENS },
  LX: { value: 60, kind: ROMAN_NUMERAL_SYMBOL_KIND.TENS },
  LXX: { value: 70, kind: ROMAN_NUMERAL_SYMBOL_KIND.TENS },
  LXXX: { value: 80, kind: ROMAN_NUMERAL_SYMBOL_KIND.TENS },
  XC: { value: 90, kind: ROMAN_NUMERAL_SYMBOL_KIND.TENS }
} as const

const ROMAN_NUMERAL_HUNDREDS_SYMBOL = {
  C: { value: 100, kind: ROMAN_NUMERAL_SYMBOL_KIND.HUNDREDS },
  CC: { value: 200, kind: ROMAN_NUMERAL_SYMBOL_KIND.HUNDREDS },
  CCC: { value: 300, kind: ROMAN_NUMERAL_SYMBOL_KIND.HUNDREDS },
  CD: { value: 400, kind: ROMAN_NUMERAL_SYMBOL_KIND.HUNDREDS },
  D: { value: 500, kind: ROMAN_NUMERAL_SYMBOL_KIND.HUNDREDS },
  DC: { value: 600, kind: ROMAN_NUMERAL_SYMBOL_KIND.HUNDREDS },
  DCC: { value: 700, kind: ROMAN_NUMERAL_SYMBOL_KIND.HUNDREDS },
  DCCC: { value: 800, kind: ROMAN_NUMERAL_SYMBOL_KIND.HUNDREDS },
  CM: { value: 900, kind: ROMAN_NUMERAL_SYMBOL_KIND.HUNDREDS }
} as const

const ROMAN_NUMERAL_THOUSANDS_SYMBOL = {
  M: { value: 1000, kind: ROMAN_NUMERAL_SYMBOL_KIND.THOUSANDS },
  MM: { value: 2000, kind: ROMAN_NUMERAL_SYMBOL_KIND.THOUSANDS },
  MMM: { value: 3000, kind: ROMAN_NUMERAL_SYMBOL_KIND.THOUSANDS }
}

export const ROMAN_NUMERAL_SYMBOL = {
  ...ROMAN_NUMERAL_UNITS_SYMBOL,
  ...ROMAN_NUMERAL_TENS_SYMBOL,
  ...ROMAN_NUMERAL_HUNDREDS_SYMBOL,
  ...ROMAN_NUMERAL_THOUSANDS_SYMBOL
} as const

/**
  Checks if the value is a roman numeral symbol found in our dictionary.
  @param value is an unknown input
*/
export function isRomanNumeralSymbol (value: unknown): value is keyof typeof ROMAN_NUMERAL_SYMBOL {
  if (typeof value !== 'string') return false
  return value in ROMAN_NUMERAL_SYMBOL
}

/**
  Lookup a value from the given dictionary.
  @param dictionary is an object of key value pairs
  @param key is the property name on the object to lookup
  @return the value of the cooresponding property in the dictionary
*/
export function lookup<D extends Record<string, unknown>> (dictionary: D, key: keyof D): D[keyof D] {
  return dictionary[key]
}
