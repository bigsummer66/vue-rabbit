//axios基础封装
import axios from 'axios'
import 'element-plus/theme-chalk/el-message.css'
import { ElMessage } from 'element-plus'
import { useUserStore } from '@/stores/userStore'
import router from '@/router'
//设置请求头
const httpInstance = axios.create({
    baseURL: import.meta.env.VITE_API_BASE_URL,
    timeout: 30000
})
//请求拦截器
httpInstance.interceptors.request.use(config => {
    const userStore = useUserStore()
    const token = userStore.userInfo.token
    if (token) {
        config.headers.Authorization = `Bearer ${token}`
    }
    return config
}, e => {
    return Promise.reject(e)
})





const showHttpError = (error) => {
    const message = error.response?.data?.message || error.message || '请求失败，请重试'
    ElMessage({ type: 'error', message })
}

//响应式拦截器
httpInstance.interceptors.response.use(
    res => res.data,
    async (e) => {
        const userStore = useUserStore()
        if (!e.response) {
            showHttpError({ message: '网络异常，请检查网络连接' })
            return Promise.reject(e)
        }

        if (e.response?.status === 401) {
            userStore.clearUserInfo()
            router.replace({ path: '/login' })
            showHttpError({ message: '登录状态已失效，请重新登录' })
            return Promise.reject(e)
        }

        showHttpError(e)
        return Promise.reject(e)
    }
)

export default httpInstance