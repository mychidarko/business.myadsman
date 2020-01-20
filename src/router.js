import Vue from 'vue';
import Router from 'vue-router';

import JwtService from "@/common/jwt.service";

Vue.use(Router);

const router = new Router({
    mode: "history",
    // base: process.env.BASE_URL,
	routes: [
        {
            path: '/',
            component: () => import('./layout/full/MainContainer'),
            children: [
                {
                    path: '/',
                    redirect: '/auth/login'
                },
                {
                    path: '/dashboard',
                    name: 'Dashboard',
                    index: 1,
                    component: () => import('./views/Dashboard')
                },
                {
                    path: '/alert',
                    name: 'Alert',
                    index: 2,
                    component: () => import('./views/components/vuesax/alert/alert')
                },
                {
                    path: '/avatar',
                    name: 'Avatar',
                    index: 3,
                    component: () => import('./views/components/vuesax/avatar/avatar')
                },
                {
                    path: '/breadcrumb',
                    name: 'Breadcrumb',
                    index: 4,
                    component: () => import('./views/components/vuesax/breadcrumb/breadcrumb')
                },
                {
                    path: '/buttons',
                    name: 'Buttons',
                    index: 5,
                    component: () => import('./views/components/vuesax/buttons/buttons')
                },
                {
                    path: '/cards',
                    name: 'Cards',
                    index: 6,
                    component: () => import('./views/components/vuesax/cards/cards')
                },
                {
                    path: '/checkbox',
                    name: 'Checkbox',
                    index: 7,
                    component: () => import('./views/components/vuesax/checkbox/checkbox')
                },
                {
                    path: '/collapse',
                    name: 'Collapse',
                    index: 9,
                    component: () => import('./views/components/vuesax/collapse/collapse')
                },
                {
                    path: '/dialog',
                    name: 'Dialog',
                    index: 10,
                    component: () => import('./views/components/vuesax/dialog/dialog')
                },
                {
                    path: '/divider',
                    name: 'Divider',
                    index: 11,
                    component: () => import('./views/components/vuesax/divider/divider')
                },
                {
                    path: '/dropdown',
                    name: 'Dropdown',
                    index: 12,
                    component: () => import('./views/components/vuesax/dropdown/dropdown')
                },
                {
                    path: '/input',
                    name: 'Input',
                    index: 13,
                    component: () => import('./views/components/vuesax/input/input')
                },
                {
                    path: '/list',
                    name: 'List',
                    index: 14,
                    component: () => import('./views/components/vuesax/list/list')
                },
                {
                    path: '/loading',
                    name: 'Loading',
                    index: 15,
                    component: () => import('./views/components/vuesax/loading/loading')
                },
                {
                    path: '/navbar',
                    name: 'Navbar',
                    index: 16,
                    component: () => import('./views/components/vuesax/navbar/navbar')
                },
                {
                    path: '/notification',
                    name: 'Notification',
                    index: 17,
                    component: () => import('./views/components/vuesax/notification/notification')
                },
                {
                    path: '/number-input',
                    name: 'Number input',
                    index: 18,
                    component: () => import('./views/components/vuesax/number-input/number-input')
                },
                {
                    path: '/pagination',
                    name: 'Pagination',
                    index: 19,
                    component: () => import('./views/components/vuesax/pagination/pagination')
                },
                {
                    path: '/popup',
                    name: 'Popup',
                    index: 20,
                    component: () => import('./views/components/vuesax/popup/popup')
                },
                {
                    path: '/progress',
                    name: 'Progress',
                    index: 21,
                    component: () => import('./views/components/vuesax/progress/progress')
                },
                {
                    path: '/radio',
                    name: 'Radio',
                    index: 22,
                    component: () => import('./views/components/vuesax/radio/radio')
                },
                {
                    path: '/switch',
                    name: 'Switch',
                    index: 26,
                    component: () => import('./views/components/vuesax/switch/switch')
                },
                {
                    path: '/tabs',
                    name: 'Tabs',
                    index: 28,
                    component: () => import('./views/components/vuesax/tabs/tabs')
                },
                {
                    path: '/textarea',
                    name: 'Textarea',
                    index: 29,
                    component: () => import('./views/components/vuesax/textarea/textarea')
                }
            ]
        },
        {
            path: '/auth/login',
            name: 'Login',
            component: () => import('./views/auth/Login')
        },
        {
            path: '/auth/register',
            name: 'Register',
            component: () => import('./views/auth/Register')
        },
        {
            path: '/auth/forgot-password',
            name: 'ForgotPassword',
            component: () => import('./views/auth/Forgot')
        },
        {
            path: '/auth/reset-password',
            name: 'ResetPassword',
            component: () => import('./views/auth/Reset')
        },
        {
            path: '*',
            component: () => import('./views/404')
        }
	]
});

router.beforeEach((to, from, next) => {
    const publicPages = ["/auth/login", "/auth/register", "/auth/forgot-password", "/auth/reset-password"];
    const authRequired = !publicPages.includes(to.path);
    const hasAuth = JwtService.getToken();

    if (authRequired && !hasAuth) {
        return next("/auth/login");
    } else if (!authRequired && hasAuth) {
        return next("/dashboard");
    }

    next();
});

export default router;