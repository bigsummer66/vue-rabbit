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


export const delCartAPI = (ids) => {
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

