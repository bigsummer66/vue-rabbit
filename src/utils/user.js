// @ts-check

/** @typedef {import('@/types/business').CartItem} CartItem */
/** @typedef {import('@/types/business').MergeCartItem} MergeCartItem */

/**
 * @param {CartItem[]} [cartList=[]]
 * @returns {MergeCartItem[]}
 */
export const buildMergeCartPayload = (cartList = []) => {
  return cartList.map((item) => ({
    skuId: item.skuId,
    selected: item.selected,
    count: item.count
  }))
}
