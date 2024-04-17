import { test } from 'node:test'
import assert from 'node:assert/strict'
import { RomanNumeral } from '../src/index.js'

void test('there are **only** seven roman numerals: I, V, X, L, C, D and M', () => {
  for (const valid of ['I', 'V', 'X', 'L', 'C', 'D', 'M']) {
    assert.equal((new RomanNumeral(valid)).value, valid)
  }

  for (const invalid of ['A', '-I', '']) {
    assert.throws(() => new RomanNumeral(invalid), TypeError)
  }
})

void test('repeated symbols are added', () => {
  assert.equal((new RomanNumeral('III')).toDecimal(), 3)
  assert.equal((new RomanNumeral('XXX')).toDecimal(), 30)
  assert.equal((new RomanNumeral('CCC')).toDecimal(), 300)
  assert.equal((new RomanNumeral('MMM')).toDecimal(), 3000)
})

void test('cannot repeat a symbol more than three times', () => {
  for (const invalid of ['VIIII', 'XXXX', 'CCCC', 'MMMM']) {
    assert.throws(() => new RomanNumeral(invalid), TypeError)
  }
})

void test('the symbols V, L, and D are never repeated', () => {
  for (const invalid of ['VV', 'LLL', 'DDDD']) {
    assert.throws(() => new RomanNumeral(invalid), TypeError)
  }
})

void test('can parse numerals that follow subtractive notation', () => {
  for (const valid of ['IV', 'IX', 'XL', 'XC', 'CD', 'CM']) {
    assert.equal(new RomanNumeral(valid).value, valid)
  }
})

void test('does not parse numerals that should not follow subtractive notation', () => {
  for (const invalid of ['IL', 'IC', 'ID', 'IM', 'VX', 'VL', 'VC', 'VD', 'VM', 'XD', 'XM']) {
    assert.throws(() => new RomanNumeral(invalid), TypeError)
  }
})

void test('does not add smaller numers left of larger numbers', t => {
  for (const invalid of ['IIV', 'IIX', 'XXL', 'XXC', 'CCD', 'CCM']) {
    assert.throws(() => new RomanNumeral(invalid), TypeError)
  }
})

void test('does not convert decimals larger than 3999 or smaller than 1', () => {
  assert.throws(() => RomanNumeral.parse(4000), TypeError)
  assert.throws(() => RomanNumeral.parse(0), TypeError)
})

void test('can convert to numerals in subtractive notation', () => {
  assert.equal(RomanNumeral.parse(4).value, 'IV')
  assert.equal(RomanNumeral.parse(9).value, 'IX')
  assert.equal(RomanNumeral.parse(69).value, 'LXIX')
  assert.equal(RomanNumeral.parse(444).value, 'CDXLIV')
  assert.equal(RomanNumeral.parse(3999).value, 'MMMCMXCIX')
})
