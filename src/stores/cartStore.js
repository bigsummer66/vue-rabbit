//封装购物车模块
import { defineStore } from 'pinia'
import { ref } from 'vue'
import { computed } from 'vue'
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
    // 计算购物车中商品的总数量
    const totalNum = computed(() => {
        return cartList.value.reduce((total, item) => total + item.count, 0)
    })
    // 计算购物车中商品的总金额
    const totalPrice = computed(() => {
        return cartList.value.reduce((total, item) => total + item.price * item.count, 0)
    })

    return {
        cartList,
        addCart,
        delCart,
        totalNum,
        totalPrice
    }
}, {
    persist: true // 持久化存储购物车数据
})