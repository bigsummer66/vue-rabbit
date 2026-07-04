import test from 'node:test'
import assert from 'node:assert/strict'

import { buildMergeCartPayload } from '../src/utils/user.js'

test('buildMergeCartPayload keeps only merge-cart fields', () => {
  const payload = buildMergeCartPayload([
    {
      skuId: 'sku-1',
      selected: true,
      count: 2,
      name: '商品A',
      price: 199
    },
    {
      skuId: 'sku-2',
      selected: false,
      count: 1,
      picture: 'https://example.com/2.png'
    }
  ])

  assert.deepEqual(payload, [
    { skuId: 'sku-1', selected: true, count: 2 },
    { skuId: 'sku-2', selected: false, count: 1 }
  ])
})

test('buildMergeCartPayload returns empty array when local cart is empty', () => {
  assert.deepEqual(buildMergeCartPayload([]), [])
})
