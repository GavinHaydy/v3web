/*
 * @Description:index.ts
 * @CreatedBy:WebStorm
 * @Author: the-ruffian
 * @Date: 2021-08-30 21:55
 * @LastEditTime: 2021-09-20 17:34:17
 * @LastEditors: the-ruffian
*/

import {createRouter,createWebHistory} from "vue-router";


export default createRouter({
    history: createWebHistory(),
    routes: [
        {
            path: '/',
            component: () => import('../layouts/layout.vue'),
            beforeEnter: (to, from, next) => {
                localStorage.getItem('token')?next() : next({
                    path: '/login'
                })
                next()
            }
        },
        {
            path: '/login',
            component: () => import('../pages/login/login.vue')
        },
        {
            path: '/register',
            component: () => import('../pages/login/register.vue')
        },
        {
            path: '/forgetPassword',
            component: () => import('../pages/login/forgetPassword.vue')
        },
        {
            path: '/:pathMatch(.*)*',
            component: () => import('../pages/publicPages/error.vue')
        }
    ]
})
