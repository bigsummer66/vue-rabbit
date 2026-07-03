import test from 'node:test'
import assert from 'node:assert/strict'

import { canProceedCheckout, getCheckoutBlockReason } from '../src/utils/cart.js'

test('empty cart should block checkout', () => {
  assert.equal(canProceedCheckout([], 0), false)
  assert.equal(getCheckoutBlockReason([], 0), '购物车为空，先去挑选商品吧')
})

test('unselected cart items should block checkout', () => {
  const cartList = [{ skuId: '1', count: 1 }]
  assert.equal(canProceedCheckout(cartList, 0), false)
  assert.equal(getCheckoutBlockReason(cartList, 0), '请先勾选需要结算的商品')
})

test('selected cart items should allow checkout', () => {
  const cartList = [{ skuId: '1', count: 1, selected: true }]
  assert.equal(canProceedCheckout(cartList, 1), true)
  assert.equal(getCheckoutBlockReason(cartList, 1), '')
})
