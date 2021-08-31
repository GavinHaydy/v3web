/*
 * @Description:request.ts
 * @CreatedBy:WebStorm
 * @Author: the-ruffian
 * @Date: 2021-08-30 21:20
 * @LastEditTime: 2021-8-31 18:06:08
 * @LastEditors: the-ruffian
*/
import axios from "axios";

const service = axios.create({
    timeout: 5000
})
service.interceptors.request.use(
    function (config){
        const token = localStorage.getItem('token')
        if (token) {
            config.headers.authorization = token
        }
        if (config.method === 'post' || config.method === 'put') {
            config.headers.contentType = 'application/json'
        }
        return config
    },
    error => {
        return Promise.reject(error)
    }
)
service.interceptors.response.use(function (response: any) {
    if (response.data.state === false) {
        localStorage.clear()
        location.replace('/')
    } else {
        return response
    }
})
export const Method:any = {
    GET: 'get',
    POST: "post",
    PUT: 'put',
    DELETE: 'delete'
}
export default service
