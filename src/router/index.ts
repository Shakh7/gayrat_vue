import {
    createRouter,
    createWebHistory,
    type RouteRecordRaw,
} from "vue-router";
import {useAuthStore} from "@/stores/auth";
// import {useConfigStore} from "@/stores/config";

const routes: Array<RouteRecordRaw> = [
    {
        path: "/",
        redirect: "/",
        component: () => import("@/layouts/main-layout/MainLayout.vue"),
        meta: {
            middleware: "auth",
        },
        children: [
            {
                path: "/",
                name: "dashboard",
                component: () => import("@/views/Dashboard.vue"),
                meta: {
                    pageTitle: "Dashboard",
                    breadcrumbs: ["Dashboards"],
                },
            },
        ],
    },

    {
        path: "/quotes",
        component: () => import("@/layouts/main-layout/MainLayout.vue"),
        meta: {
            middleware: "auth",
        },
        children: [
            {
                path: "",
                name: "quotes",
                component: () => import("@/views/quotes/list.vue"),
                meta: {
                    pageTitle: "Quotes",
                    breadcrumbs: ["Quotes"],
                },
            },
            {
                path: ":id",
                name: "quote-details",
                component: () => import("@/views/crafted/pages/quotes/AddSubscription.vue"),
                meta: {
                    pageTitle: "Quotes",
                    breadcrumbs: ["Quotes"],
                },
            },
        ],
    },
    {
        path: "/clients",
        component: () => import("@/layouts/main-layout/MainLayout.vue"),
        meta: {
            middleware: "auth",
        },
        children: [
            {
                path: "",
                name: "clients",
                component: () => import("@/views/crafted/pages/users/list.vue"),
                meta: {
                    pageTitle: "Clients",
                    breadcrumbs: ["Clients"],
                },
            },
        ],
    },

    //-Start::Login-Pages
    {
        path: "/",
        component: () => import("@/layouts/AuthLayout.vue"),
        children: [
            {
                path: "/sign-in",
                name: "sign-in",
                component: () =>
                    import("@/views/crafted/authentication/basic-flow/SignIn.vue"),
                meta: {
                    pageTitle: "Sign In",
                },
            },
            {
                path: "/sign-up",
                name: "sign-up",
                component: () =>
                    import("@/views/crafted/authentication/basic-flow/SignUp.vue"),
                meta: {
                    pageTitle: "Sign Up",
                },
            },
            {
                path: "/password-reset",
                name: "password-reset",
                component: () =>
                    import("@/views/crafted/authentication/basic-flow/PasswordReset.vue"),
                meta: {
                    pageTitle: "Password reset",
                },
            },
        ],
    },
    //-End::Login-Pages

    //-Start::Error-Pages
    {
        path: "/",
        component: () => import("@/layouts/SystemLayout.vue"),
        children: [
            {
                // the 404 route, when none of the above matches
                path: "/404",
                name: "404",
                component: () => import("@/views/crafted/authentication/Error404.vue"),
                meta: {
                    pageTitle: "Error 404",
                },
            },
            {
                path: "/500",
                name: "500",
                component: () => import("@/views/crafted/authentication/Error500.vue"),
                meta: {
                    pageTitle: "Error 500",
                },
            },
        ],
    },
    //-End::Error-Pages

    {
        path: "/:pathMatch(.*)*",
        redirect: "/404",
    },
];

const router = createRouter({
    history: createWebHistory(),
    routes,
});

router.beforeEach((to, from, next) => {
    const authStore = useAuthStore();
    // const configStore = useConfigStore();

    // current page view title
    document.title = `${to.meta.pageTitle} - ${import.meta.env.VITE_APP_NAME}`;

    // reset config to initial state
    // configStore.resetLayoutConfig();

    next()
    // verify auth token before each page change
    // authStore.verifyAuth()
    //
    //
    // if (to.meta.middleware == "auth") {
    //
    //     if (authStore.isAuthenticated === true) {
    //         next();
    //     } else {
    //         next({name: "sign-in"});
    //     }
    // } else {
    //     next();
    // }

    // Scroll page to top on every route change
    window.scrollTo({
        top: 0,
        left: 0,
        behavior: "smooth",
    });
});

export default router;
