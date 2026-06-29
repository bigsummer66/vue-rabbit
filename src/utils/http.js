//axios基础封装
import axios from 'axios'
import 'element-plus/theme-chalk/el-message.css'
import { ElMessage } from 'element-plus'
import { useUserStore } from '@/stores/user'
import router from '@/router'
//设置请求头
const httpInstance = axios.create({
    baseURL: 'https://pcapi-xiaotuxian-front-devtest.itheima.net',
    timeout: 5000 // 请求超时时间
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





//响应式拦截器
httpInstance.interceptors.response.use(res => res.data, e => {
    const userStore = useUserStore()
    //统一错误提示
    ElMessage({
        type: 'error',
        message: e.response.data.message
    })
    //401token失效处理

    //1.清除本地用户数据

    //2.跳转到登录页面
    if (e.response.status === 401) {
        //1.清除本地用户数据
        userStore.clearUserInfo()
        //2.跳转到登录页面
        router.replace({ path: '/login' }) //跳转到登录页面
    }
    //统一错误处理
    return Promise.reject(e)
})

export default httpInstance