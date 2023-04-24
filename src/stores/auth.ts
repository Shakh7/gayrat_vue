import {ref} from "vue";
import {defineStore} from "pinia";
import ApiService from "@/core/services/ApiService";
import JwtService from "@/core/services/JwtService";
import router from "@/router/index"
import axios from "axios";
import {apiService} from "@/core/services/ApiServices";

export interface User {
    id: number;
    full_name: string;
    user_type: string;
    email: string;
    api_token: string;
    password: string
}

export const useAuthStore = defineStore("auth", () => {
    const errors = ref([] as any);
    const user = ref<User>({} as User);
    const isAuthenticated = ref(!!JwtService.getToken());

    function setAuth(authUser: User) {
        isAuthenticated.value = true;
        user.value = authUser;
        errors.value = [];
        JwtService.saveToken(user.value.api_token);
    }

    function setError(error: any) {
        errors.value.push(error);
    }

    function purgeAuth() {
        isAuthenticated.value = false;
        user.value = {} as User;
        errors.value = [];
        JwtService.destroyToken();
    }

    function login(credentials: User) {
        return apiService('login', {
            method: 'POST',
            body: JSON.stringify({
                email: credentials.email,
                password: credentials.password
            })
        }).then((response) => {
            errors.value = []
            isAuthenticated.value = true
        }).catch(error => {
            setError(Object.values(JSON.parse((error.message)))[0])
        })

        // ApiService.post('http://127.0.0.1:8000/api/login', {
        //     email: credentials.email,
        //     password: credentials.password
        // })
        //     .then((response) => {
        //         isAuthenticated.value = true
        //     })
        // return ApiService.post("/login", credentials)
        //     .then(({data}) => {
        //         // JwtService.saveToken(data.access);
        //     })
        //     .catch(({response}) => {
        //     });
    }

    function logout() {
        purgeAuth();
    }

    function register(credentials: User) {
        return ApiService.post("register", credentials)
            .then(({data}) => {
                setAuth(data);
            })
            .catch(({response}) => {
                setError(response.data.errors);
            });
    }

    function forgotPassword(email: string) {
        return ApiService.post("forgot_password", email)
            .then(() => {
                setError({});
            })
            .catch(({response}) => {
                setError(response.data.errors);
            });
    }

    function verifyAuth() {
        // if (JwtService.getToken()) {
        //     // ApiService.setHeader();
        //     ApiService.post("/token/verify/", {token: JwtService.getToken()})
        //         .then(({data}) => {
        //             let user_info = {
        //                 id: data.user.id,
        //                 full_name: data.user.full_name,
        //                 user_type: data.user.user_type,
        //                 email: data.user.email,
        //                 api_token: data.access,
        //             } as User;
        //             setAuth(user_info);
        //         })
        //         .catch(() => {
        //             purgeAuth();
        //             router.push({name: 'sign-in'})
        //         });
        // } else {
        //     console.log('no token')
        //     purgeAuth();
        // }
        return null
    }

    return {
        errors,
        user,
        isAuthenticated,
        login,
        logout,
        register,
        forgotPassword,
        verifyAuth,
    };
});
