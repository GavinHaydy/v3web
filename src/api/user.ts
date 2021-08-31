/*
 * @Description:user.ts
 * @CreatedBy:WebStorm
 * @Author: the-ruffian
 * @Date: 2021-08-30 21:32
 * @LastEditTime: 2021-8-31 18:06:54
 * @LastEditors: the-ruffian
*/
import request, {Method} from "../utils/request";

export const userLogin = (data = {}) => {
    return request({
        url: '/api/user/login',
        method: Method.POST,
        data
    })
}
