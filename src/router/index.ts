/*
 * @Description:index.ts
 * @CreatedBy:WebStorm
 * @Author: the-ruffian
 * @Date: 2021-08-30 21:55
 * @LastEditTime: 2021-9-7 20:09:15
 * @LastEditors: the-ruffian
*/

import {createRouter,createWebHistory} from "vue-router";

// createApp(Router)
// const router = createRouter({
//     history: createWebHashHistory(),
//     routes: [
//         {
//             path: '/',
//             component: () => import( '@/components/HelloWorld.vue')
//         }
//     ]
// })
// export default router
export default createRouter({
    history: createWebHistory(),
    routes: [
        {
            path: '/',
            component: () => import('../pages/login/login.vue')
        },
        {
            path: '/register',
            component: () => import('../pages/login/register.vue')
        }
    ]
})
