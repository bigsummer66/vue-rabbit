export const buildOrderPayload = ({
  deliveryTimeType,
  payType,
  payChannel,
  buyerMessage = '',
  goods = [],
  addressId
}) => {
  return {
    deliveryTimeType,
    payType,
    payChannel,
    buyerMessage: buyerMessage.trim(),
    goods: goods.map((item) => ({
      skuId: item.skuId,
      count: item.count
    })),
    addressId
  }
}
