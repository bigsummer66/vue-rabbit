import { getCategoryAPI } from '@/apis/category'
import { ref, onMounted } from 'vue'
import { useRoute } from 'vue-router'
import { onBeforeRouteUpdate } from 'vue-router'
export function useCategory() {
    const categoryList = ref([])
    const route = useRoute()
    onMounted(async () => {
        const res = await getCategoryAPI(route.params.id)
        categoryList.value = res.result
    })

    onBeforeRouteUpdate(async (to) => {
        const res = await getCategoryAPI(to.params.id)
        categoryList.value = res.result
    })
    return { categoryList }
}