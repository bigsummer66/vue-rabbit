import httpInstance from '@/utils/http'

export function getHomeBannerAPI() {
    return httpInstance({
        url: '/home/banner',
    })
}

/**
 * @description: 获取新鲜好物
 * @param {*}
 * @return {*}
 */
export const findNewAPI = () => {
    return httpInstance({
        url: '/home/new'
    })
}