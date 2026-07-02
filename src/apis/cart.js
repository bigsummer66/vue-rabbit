// 加入购物车
import httpInstance from '@/utils/http'

export const insertCartAPI = ({ skuId, count }) => {
    return httpInstance({
        url: '/member/cart',
        method: 'POST',
        data: {
            skuId,
            count
        }
    })
}

//获取最新购物车列表
export const findNewCartListAPI = () => {
    return httpInstance({
        url: '/member/cart',
        method: 'GET'
    })
}

// 修改购物车商品（选中状态/数量）
export const updateCartAPI = (id, data) => {
    return httpInstance({
        url: `/member/cart/${id}`,
        method: 'PUT',
        data
    })
}

// 修改购物车全选/取消全选
export const updateCartSelectedAPI = (data) => {
    return httpInstance({
        url: '/member/cart/selected',
        method: 'PUT',
        data
    })
}

export const delCartAPI = (ids) => {
    return httpInstance({
        url: '/member/cart',
        method: 'DELETE',
        data: {
            ids
        }
    })
}

// 清空购物车（删除全部）
export const clearCartAPI = (ids) => {
    return httpInstance({
        url: '/member/cart',
        method: 'DELETE',
        data: {
            ids
        }
    })
}

//合并购物车接口
export const mergeCartAPI = (data) => {
    return httpInstance({
        url: '/member/cart/merge',
        method: 'POST',
        data
    })
}

