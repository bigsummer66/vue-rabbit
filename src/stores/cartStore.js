//封装购物车模块
import { defineStore } from 'pinia'
import { ref } from 'vue'
export const useCartStore = defineStore('cart', () => {
    const cartList = ref([])
    const addCart = (goods) => {
        const item = cartList.value.find((item) => goods.skuId === item.skuId)
        if (item) {
            item.count++
        } else {
            cartList.value.push(goods)
        }
    }
    // 删除购物车中的商品
    const delCart = (skuId) => {
        cartList.value = cartList.value.filter((item) => item.skuId !== skuId)
    }
    return {
        cartList,
        addCart,
        delCart
    }
}, {
    persist: true // 持久化存储购物车数据
})