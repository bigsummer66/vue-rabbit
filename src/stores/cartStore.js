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

    const isAll = computed(() => {
        return cartList.value.every((item) => item.selected)
    })

    //已选择数量
    const selectedCount = computed(() => {
        return cartList.value.filter((item) => item.selected).reduce((total, item) => total + item.count, 0)
    })
    //已选择商品总价
    const selectedPrice = computed(() => {
        return cartList.value.filter((item) => item.selected).reduce((total, item) => total + item.price * item.count, 0)
    })









    //单选功能
    const singleCheck = (skuId, selected) => {
        const item = cartList.value.find((item) => item.skuId === skuId)
        if (item) {
            item.selected = selected
        }
    }
    const allCheck = (selected) => {
        cartList.value.forEach((item) => {
            item.selected = selected
        })
    }




    return {
        cartList,
        addCart,
        delCart,
        totalNum,
        totalPrice,
        singleCheck,
        isAll,
        allCheck,
        selectedCount,
        selectedPrice

    }
}, {
    persist: true
})