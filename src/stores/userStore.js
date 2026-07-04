//管理用户数据相关

import { defineStore } from 'pinia'
import { ref } from 'vue'
import { loginAPI } from '@/apis/user'
import { mergeCartAPI } from '@/apis/cart'
import { buildMergeCartPayload } from '@/utils/user'

/** @typedef {import('@/types/business').CartItem} CartItem */
/** @typedef {import('@/types/business').LoginPayload} LoginPayload */

export const useUserStore = defineStore('user', () => {
    const userInfo = ref({})

    /**
     * @param {CartItem[]} [cartList=[]]
     */
    const mergeLocalCart = async (cartList = []) => {
        if (!cartList?.length) return
        const localData = buildMergeCartPayload(cartList)
        await mergeCartAPI(localData)
    }

    /**
     * @param {LoginPayload} payload
     */
    const getUserInfo = async ({ account, password }) => {
        const res = await loginAPI({ account, password })
        userInfo.value = res.result
        const { useCartStore } = await import('@/stores/cartStore')
        const cartStore = useCartStore()
        await mergeLocalCart(cartStore.cartList)
        await cartStore.updateNewList()
    }
    //退出清除用户信息
    const clearUserInfo = async () => {
        userInfo.value = {}
        // 执行清除购物车的 action
        const { useCartStore } = await import('@/stores/cartStore')
        const cartStore = useCartStore()
        await cartStore.clearCart()
    }
    //3.return state和action
    return {
        userInfo,
        getUserInfo,
        clearUserInfo
    }
}, {
    persist: true
})
