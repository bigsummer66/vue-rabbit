export const buildMergeCartPayload = (cartList = []) => {
  return cartList.map((item) => ({
    skuId: item.skuId,
    selected: item.selected,
    count: item.count
  }))
}
