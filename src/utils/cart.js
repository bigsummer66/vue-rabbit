// @ts-check

/** @typedef {import('@/types/business').CartItem} CartItem */

/**
 * @param {CartItem[]} [cartList=[]]
 * @param {number} [selectedCount=0]
 * @returns {string}
 */
export const getCheckoutBlockReason = (cartList = [], selectedCount = 0) => {
  if (!cartList.length) {
    return '购物车为空，先去挑选商品吧'
  }

  if (!selectedCount) {
    return '请先勾选需要结算的商品'
  }

  return ''
}

/**
 * @param {CartItem[]} [cartList=[]]
 * @param {number} [selectedCount=0]
 * @returns {boolean}
 */
export const canProceedCheckout = (cartList = [], selectedCount = 0) => {
  return getCheckoutBlockReason(cartList, selectedCount) === ''
}
