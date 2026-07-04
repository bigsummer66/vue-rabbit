export interface CartItem {
  skuId: string
  count: number
  selected?: boolean
  id?: string | number
  name?: string
  price?: number
  picture?: string
  attrsText?: string
}

export interface MergeCartItem {
  skuId: string
  selected?: boolean
  count: number
}

export interface LoginPayload {
  account: string
  password: string
}

export interface AddressForm {
  receiver: string
  contact: string
  provinceCode: string
  cityCode: string
  countyCode: string
  address: string
  postalCode: string
  addressTags: string
  isDefault?: number
  fullLocation: string
}

export interface OrderGoodsItem {
  skuId: string
  count: number
}

export interface BuildOrderPayloadParams {
  deliveryTimeType: number
  payType: number
  payChannel: number
  buyerMessage?: string
  goods?: OrderGoodsItem[]
  addressId: string | number
}

export interface OrderPayload {
  deliveryTimeType: number
  payType: number
  payChannel: number
  buyerMessage: string
  goods: OrderGoodsItem[]
  addressId: string | number
}
