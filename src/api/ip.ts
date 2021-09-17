/*
 * @Description:ip.ts
 * @CreatedBy:WebStorm
 * @Author: the-ruffian
 * @Date: 2021-09-17 09:57
 * @LastEditTime: 2021-9-17 11:23:46
 * @LastEditors: the-ruffian
*/

//获取客户端ip地址
import request, {Method} from "../utils/request";

export const userIP = (data = {}) => {
    return request({
        url: '/ip/cityjson?id=utf8',
        method: Method.POST,
        data
    })
}
