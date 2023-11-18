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

    // before page access check if page requires authentication
    if (to.meta.middleware == "auth") {
        const authStore = useAuthStore();
        authStore.verifyAuth()
        if (authStore.isAuthenticated === true) {
            next();
        } else {
            next({name: "sign-in"});
        }
    } else {
        next();
    }

    // current page view title
    document.title = `${to.meta.pageTitle} - ${import.meta.env.VITE_APP_NAME}`;

    // Scroll page to top on every route change
    window.scrollTo({
        top: 0,
        left: 0,
        behavior: "smooth",
    });
});

export default router;
