import {
    createRouter,
    createWebHistory,
} from "vue-router";
import {useAuthStore} from "@/stores/auth";
import routes from "./routes";

const router = createRouter({
    history: createWebHistory(),
    routes,
});

router.beforeEach((to, from, next) => {
    const authStore = useAuthStore();

    // current page view title
    document.title = `${to.meta.pageTitle} - ${import.meta.env.VITE_APP_NAME}`;

    // verify auth token before each page change
    authStore.verifyAuth()

    // before page access check if page requires authentication
    if (to.meta.middleware == "auth") {
        if (authStore.isAuthenticated === true) {
            if (to.meta.permissions) {
                next();
                console.log('permissions', to.meta.permissions)
            } else {
                next();
            }
        } else {
            next({name: "sign-in"});
        }
    } else {
        next();
    }

    // Scroll page to top on every route change
    window.scrollTo({
        top: 0,
        left: 0,
        behavior: "smooth",
    });
});

export default router;
