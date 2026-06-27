import { ref, onMounted } from 'vue'
import { getHomeBannerAPI } from '@/apis/home'
export function useBanner() {
    const bannerList = ref([])
    const getHomeBanner = async () => {
        const res = await getHomeBannerAPI({
            distributionSite: '2'
        })
        bannerList.value = res.result
    }
    onMounted(() => {
        getHomeBanner()
    })
    return {
        bannerList
    }
}