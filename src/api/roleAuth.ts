import request, {Method} from "../utils/request";

/**
 * @Description 获取角色菜单
 * @param data
 */
export const getRoleMenu = (data = {}) => {
    return request({
        url: '/api/auth/list',
        method: Method.POST,
        data
    })
}