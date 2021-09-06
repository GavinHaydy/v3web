/*
 * @Description:global.ts
 * @CreatedBy:WebStorm
 * @Author: the-ruffian
 * @Date: 2021-09-05 23:15
 * @LastEditTime: 2021-9-6 18:37:40
 * @LastEditors: the-ruffian
*/
const checkPhone = /^1[34578][0-9]{9}$/
const checkPassword = /^[A-Za-z0-9]{8,20}$/
const checkEmail = /^[a-zA-Z0-9_-]{6,20}@[a-zA-Z0-9]+(\.[a-zA-Z0-9]+)+$/
const checkCode = /^[0-9]{4}$/
const checkNull = /\s/

export default {
    install (app:any, options:any) {
        app.config.globalProperties.$checkPhone = checkPhone
        app.config.globalProperties.$checkPassword = checkPassword
        app.config.globalProperties.$checkEmail = checkEmail
        app.config.globalProperties.$checkCode = checkCode
        app.config.globalProperties.$checkNull = checkNull
    }
}

