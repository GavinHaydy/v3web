/*
 * @Description:用户及登录相关模块接口
 * @CreatedBy:WebStorm
 * @Author: the-ruffian
 * @Date: 2021-08-30 21:32
 * @LastEditTime: 2021-9-2 14:04:50
 * @LastEditors: the-ruffian
*/
import request, {Method} from "../utils/request";

export const userRegister = (data = {}) => {
    return request({
        url: '/api/user/register',
        method: Method.POST,
        data
    })
}
export const userLogin = (data = {}) => {
    return request({
        url: '/api/user/login',
        method: Method.POST,
        data
    })
}
export const userDelete = (data = {}) => {
    return request({
        url: '/api/user/delete/',
        method: Method.DELETE,
        data
    })
}
export const userUpdate = (data = {}) => {
    return request({
        url: '/api/user/update',
        method: Method.PUT,
        data
    })
}
export const userFindAll = (data = {}) => {
    return request({
        url: '/api/user/list',
        method: Method.POST,
        data
    })
}
export const getMenu = (data = {}) => {
    return request({
        url: '/api/auth/list',
        method: Method.POST,
        data
    })
}
export const getEmailCode = (data = {}) => {
    return request({
        url: '/api/getCode',
        method: Method.POST,
        data
    })
}
export const forgetPassword = (data = {}) => {
    return request({
        url: '/api/forgetPassword',
        method: Method.POST,
        data
    })
}
export const logout = (data = {}) => {
    return request({
        url: '/api/logout',
        method: Method.POST,
        data
    })
}
