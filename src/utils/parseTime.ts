/*
 * @Description:parseTime.ts
 * @CreatedBy:WebStorm
 * @Author: the-ruffian
 * @Date: 2021-09-03 16:36
 * @LastEditTime: 2021-09-03 16:36
 * @LastEditors: the-ruffian
*/
export function parseTime (time :any) {
    let date = new Date(time) // 时间戳为10位需*1000，时间戳为13位的话不需乘1000
    let Y = date.getFullYear() + '-'
    let M = (date.getMonth() + 1 < 10 ? '0' + (date.getMonth() + 1) : date.getMonth() + 1) + '-' // getMonth范围0-11
    let D = (date.getDate() < 10 ? '0' + date.getDate() : date.getDate()) + ' '
    let h = (date.getHours() < 10 ? '0' + date.getHours() : date.getHours()) + ':'
    let m = (date.getMinutes() < 10 ? '0' + date.getMinutes() : date.getMinutes()) + ':'
    let s = date.getSeconds() < 10 ? '0' + date.getSeconds() : date.getSeconds()
    return Y + M + D + h + m + s
}
