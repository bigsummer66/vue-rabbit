import test from 'node:test'
import assert from 'node:assert/strict'

import { buildOrderPayload } from '../src/utils/order.js'

test('buildOrderPayload keeps only skuId and count for order submission', () => {
  const payload = buildOrderPayload({
    deliveryTimeType: 1,
    payType: 1,
    payChannel: 1,
    buyerMessage: '  请工作日送达  ',
    addressId: 'address-1',
    goods: [
      { skuId: 'sku-1', count: 2, name: '商品A', price: 199 },
      { skuId: 'sku-2', count: 1, selected: true, attrsText: '红色' }
    ]
  })

  assert.deepEqual(payload, {
    deliveryTimeType: 1,
    payType: 1,
    payChannel: 1,
    buyerMessage: '请工作日送达',
    addressId: 'address-1',
    goods: [
      { skuId: 'sku-1', count: 2 },
      { skuId: 'sku-2', count: 1 }
    ]
  })
})

test('buildOrderPayload returns empty goods list when nothing is selected for submission', () => {
  const payload = buildOrderPayload({
    deliveryTimeType: 2,
    payType: 2,
    payChannel: 2,
    buyerMessage: '',
    addressId: 'address-2',
    goods: []
  })

  assert.deepEqual(payload.goods, [])
  assert.equal(payload.addressId, 'address-2')
})
