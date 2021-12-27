/**
 * @description 栏目接口
 * @author The-Ruffian
 */
import request, {Method} from "../utils/request";

/**
 *
 * @description 新增栏目
 * @param data: columnName
 */
export const addColumn = (data = {}) => {
  return request({
      url: '/api/columnMenu/add',
      method: Method.POST,
      data
  })
}
/**
 *
 * @description 查询栏目
 * @param data: pageSize,pageNO
 */
export const searchColumn = (data= {}) => {
  return request({
      url: '/api/columnMenu/list',
      method: Method.POST,
      data
  })
}

/**
 *
 * @description 删除栏目
 * @param data:columnName
 */
export const delColumn = ( data = {}) => {
    return request({
        url: '/api/columnMenu/delete',
        method: Method.POST,
        data
    })
}
