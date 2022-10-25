import {RouteRecordRaw} from 'vue-router';
import {AuthPage, UserOnly} from "src/router/auth";

const routes: RouteRecordRaw[] = [
    {
        path: '/',
        meta: {auth: UserOnly},
        component: () => import('layouts/MainLayout.vue'),
        children: [
            {path: '', component: () => import('pages/IndexPage.vue')}
        ],
    },

    {
        path: '/auth',
        meta: {auth: UserOnly},
        component: () => import('layouts/AuthLayout.vue'),
        children: [
            {path: 'login', meta: {auth: AuthPage}, component: () => import('pages/LoginPage.vue')},
            {path: 'register', meta: {auth: AuthPage}, component: () => import('pages/RegisterPage.vue')},
        ],
    },



    // Always leave this as last one,
    // but you can also remove it
    {
        path: '/:catchAll(.*)*',
        component: () => import('pages/ErrorNotFound.vue'),
    },
];

export default routes;
