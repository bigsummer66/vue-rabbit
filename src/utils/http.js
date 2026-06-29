//axios基础封装
import axios from 'axios'
import 'element-plus/theme-chalk/el-message.css'
import { ElMessage } from 'element-plus'


const httpInstance = axios.create({
    baseURL: 'https://pcapi-xiaotuxian-front-devtest.itheima.net',
    timeout: 5000 // 请求超时时间
})
//请求拦截器
httpInstance.interceptors.request.use(config => {
    return config
}, e => Promise.reject(e))
//响应式拦截器
httpInstance.interceptors.response.use(res => res.data, e => {
    //统一错误提示
    ElMessage({
        type: 'error',
        message: e.response.data.message
    })
    //统一错误处理
    return Promise.reject(e)
})

export default httpInstance