/*
 * @Description:index.ts
 * @CreatedBy:WebStorm
 * @Author: the-ruffian
 * @Date: 2021-08-30 21:55
 * @LastEditTime: 2021-11-13 18:41:50
 * @LastEditors: the-ruffian
*/

import {createRouter,createWebHistory} from "vue-router";


export default createRouter({
    history: createWebHistory(),
    routes: [
        {
            path: '/',
            component: () => import('../pages/publicPages/editArticle.vue'),
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
            path: '/admin',
            component: () => import('../pages/backstage/admin.vue'),
            beforeEnter: (to, from, next) => {
                localStorage.getItem('token')?next() : next({
                    path: '/'
                })
                next()
            }
        },
        {
            path: '/:pathMatch(.*)*',
            component: () => import('../pages/publicPages/error.vue')
        }
    ]
})
