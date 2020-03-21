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
                    redirect: '/dashboard'
                },
                {
                    path: '/dashboard',
                    name: 'Dashboard',
                    component: () => import('./views/Dashboard')
                },
                {
                    path: '/ads/create',
                    name: 'CreateAd',
                    component: () => import('./views/CreateAd')
                },
                {
                    path: '/ads/manage',
                    name: 'ManageAds',
                    component: () => import('./views/ManageAds')
                },
                {
                    path: '/ads/manage/clickable/:id',
                    name: 'ManageClickableAd',
                    component: () => import('./views/ManageClickableAd')
                },
                {
                    path: '/ads/manage/video/:id',
                    name: 'ManageVideoAd',
                    component: () => import('./views/ManageVideoAd')
                },
                {
                    path: '/ads/edit/clickable/:id',
                    name: 'EditClickableAd',
                    component: () => import('./views/EditClickableAd')
                },
                {
                    path: '/ads/edit/video/:id',
                    name: 'EditVideoAd',
                    component: () => import('./views/EditVideoAd')
                },
                {
                    path: '/products/create',
                    name: 'CreateProduct',
                    component: () => import('./views/CreateProduct')
                },
                {
                    path: '/products/manage',
                    name: 'ManageProducts',
                    component: () => import('./views/ManageProducts')
                },
                {
                    path: '/products/manage/:id',
                    name: 'ManageProduct',
                    component: () => import('./views/ManageProduct')
                },
                {
                    path: '/analytics',
                    name: 'Analytics',
                    component: () => import('./views/Analytics')
                },
                {
                    path: '/analytics/ad/:type/:id',
                    name: 'AdAnalytics',
                    component: () => import('./views/AdAnalytics')
                },
                {
                    path: '/reports',
                    name: 'Reports',
                    component: () => import('./views/Reports')
                },
                {
                    path: '/reports/smart',
                    name: 'SmartReports',
                    component: () => import('./views/SmartReports')
                },
                {
                    path: '/surveys',
                    name: 'Surveys',
                    component: () => import('./views/Surveys')
                },
                // {
                //     path: '/earn',
                //     name: 'Earn',
                //     component: () => import('./views/Earn')
                // },
                // {
                //     path: '/developers',
                //     name: 'DevTools',
                //     component: () => import('./views/DevTools')
                // },
                {
                    path: '/settings',
                    name: 'Settings',
                    component: () => import('./views/settings/SettingsHome')
                },
                {
                    path: '/settings/account',
                    name: 'AccountSettings',
                    component: () => import('./views/settings/AccountSettings')
                },
                {
                    path: '/payments',
                    name: 'Payments',
                    component: () => import('./views/Payments')
                },
                {
                    path: '/profile',
                    name: 'Profile',
                    component: () => import('./views/Profile')
                },
                {
                    path: '/feedback',
                    name: 'Feedback',
                    component: () => import('./views/Feedback')
                },
                {
                    path: '/alert',
                    name: 'Alert',
                    component: () => import('./views/components/vuesax/alert/alert')
                },
                {
                    path: '/avatar',
                    name: 'Avatar',
                    component: () => import('./views/components/vuesax/avatar/avatar')
                },
                {
                    path: '/breadcrumb',
                    name: 'Breadcrumb',
                    component: () => import('./views/components/vuesax/breadcrumb/breadcrumb')
                },
                {
                    path: '/buttons',
                    name: 'Buttons',
                    component: () => import('./views/components/vuesax/buttons/buttons')
                },
                {
                    path: '/cards',
                    name: 'Cards',
                    component: () => import('./views/components/vuesax/cards/cards')
                },
                {
                    path: '/checkbox',
                    name: 'Checkbox',
                    component: () => import('./views/components/vuesax/checkbox/checkbox')
                },
                {
                    path: '/collapse',
                    name: 'Collapse',
                    component: () => import('./views/components/vuesax/collapse/collapse')
                },
                {
                    path: '/dialog',
                    name: 'Dialog',
                    component: () => import('./views/components/vuesax/dialog/dialog')
                },
                {
                    path: '/divider',
                    name: 'Divider',
                    component: () => import('./views/components/vuesax/divider/divider')
                },
                {
                    path: '/dropdown',
                    name: 'Dropdown',
                    component: () => import('./views/components/vuesax/dropdown/dropdown')
                },
                {
                    path: '/input',
                    name: 'Input',
                    component: () => import('./views/components/vuesax/input/input')
                },
                {
                    path: '/list',
                    name: 'List',
                    component: () => import('./views/components/vuesax/list/list')
                },
                {
                    path: '/loading',
                    name: 'Loading',
                    component: () => import('./views/components/vuesax/loading/loading')
                },
                {
                    path: '/navbar',
                    name: 'Navbar',
                    component: () => import('./views/components/vuesax/navbar/navbar')
                },
                {
                    path: '/notification',
                    name: 'Notification',
                    component: () => import('./views/components/vuesax/notification/notification')
                },
                {
                    path: '/number-input',
                    name: 'Number input',
                    component: () => import('./views/components/vuesax/number-input/number-input')
                },
                {
                    path: '/pagination',
                    name: 'Pagination',
                    component: () => import('./views/components/vuesax/pagination/pagination')
                },
                {
                    path: '/popup',
                    name: 'Popup',
                    component: () => import('./views/components/vuesax/popup/popup')
                },
                {
                    path: '/progress',
                    name: 'Progress',
                    component: () => import('./views/components/vuesax/progress/progress')
                },
                {
                    path: '/radio',
                    name: 'Radio',
                    component: () => import('./views/components/vuesax/radio/radio')
                },
                {
                    path: '/switch',
                    name: 'Switch',
                    component: () => import('./views/components/vuesax/switch/switch')
                },
                {
                    path: '/tabs',
                    name: 'Tabs',
                    component: () => import('./views/components/vuesax/tabs/tabs')
                },
                {
                    path: '/textarea',
                    name: 'Textarea',
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