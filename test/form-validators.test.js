import test from 'node:test'
import assert from 'node:assert/strict'

import { normalizeLoginPayload, validateAddressForm } from '../src/utils/formValidators.js'

test('normalizeLoginPayload trims account and password', () => {
  assert.deepEqual(
    normalizeLoginPayload({ account: ' heima282 ', password: ' hm#qd@23! ' }),
    { account: 'heima282', password: 'hm#qd@23!' }
  )
})

test('validateAddressForm requires valid phone and postal code', () => {
  const message = validateAddressForm({
    receiver: '张三',
    contact: '123',
    provinceCode: '110000',
    cityCode: '110100',
    countyCode: '110101',
    address: '测试街道 1 号',
    postalCode: '100000',
    addressTags: '家',
    fullLocation: '北京市 东城区'
  })

  assert.equal(message, '请填写正确的手机号')
})

test('validateAddressForm passes with complete valid data', () => {
  const message = validateAddressForm({
    receiver: '张三',
    contact: '13800138000',
    provinceCode: '110000',
    cityCode: '110100',
    countyCode: '110101',
    address: '测试街道 1 号',
    postalCode: '100000',
    addressTags: '家',
    fullLocation: '北京市 东城区'
  })

  assert.equal(message, '')
})
