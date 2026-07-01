import { useUserStore } from '@/stores/userStore'
import { defineStore } from 'pinia'
import { ref, computed } from 'vue'
import { insertCartAPI, findNewCartListAPI, delCartAPI } from '@/apis/cart'

export const useCartStore = defineStore('cart', () => {
    const userStore = useUserStore() // 获取用户信息
    const isLogin = computed(() => userStore.userInfo?.token)
    const cartList = ref([])

    const updateNewList = async () => {
        const res = await findNewCartListAPI()
        cartList.value = res.result
    }

    const addCart = async (goods) => {
        const { skuId, count } = goods
        if (isLogin.value) {
            await insertCartAPI({ skuId, count })
            await updateNewList()
        } else {
            const item = cartList.value.find((item) => goods.skuId === item.skuId)
            if (item) {
                item.count++
            } else {
                cartList.value.push(goods)
            }
        }
    }

    // 删除购物车中的商品
    const delCart = async (skuId) => {
        if (isLogin.value) {
            await delCartAPI([skuId])
            await updateNewList()
        } else {
            cartList.value = cartList.value.filter((item) => item.skuId !== skuId)
        }
    }

    // 清空购物车
    const clearCart = async () => {
        // 如果有清空购物车的 API，可在此调用；否则直接清空本地列表
        cartList.value = []
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
        clearCart,
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