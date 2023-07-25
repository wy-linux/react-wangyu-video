
import { message } from "antd"
import axios from "axios"
import { BASE_URL } from "./url"

const request = axios.create({
    baseURL: BASE_URL, 
})
//拦截器携带Token
request.interceptors.request.use((config) => {
    const token = localStorage.getItem('token')
    if (token) {
        config.headers['authorization'] = `Bearer ${token}`
    }
    return config
})

request.interceptors.response.use(
  //请求成功
    response => {
        if(response.data.message){
            message.success(response.data.message)
        }
        return response.data.data
    },
  //请求失败
    error => { 
        const {response} = error
        if(response?.data?.message) {
            message.error(response.data.message)
        }
        if(response.status === 401) {      
            localStorage.removeItem('token')
            window.location.href = '#/login'
          }
        return Promise.reject(error)
    }
)
export default request