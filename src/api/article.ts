/**
 * @description 文章模块接口
 */
import request, {Method} from "../utils/request";

/**
 *
 * @param data: title,author,article
 */
export const addArticle = (data={})=>{
    return request({
        url: '/api/article/add',
        method: Method.POST,
        data
    })
}
