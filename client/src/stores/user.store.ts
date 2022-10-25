import {defineStore} from "pinia";
import {Cookies} from "quasar";
import {CookieKey, CookieUserInterface} from "src/define/cookie.define";


export const useUserStore = defineStore('user-store', {
    state: () => ({
        id: "",
        access_token: "",
        email: "",
        super: false,
        username: "",
    }),
    getters: {
        isLogin(state): boolean {
            return !!state.access_token;
        },
        isSuper(state): boolean {
            return (!!state.access_token) && state.super;
        }
    },
    actions: {
        refreshFromCookie(cookie: Cookies) {
            const userInCookie: CookieUserInterface = cookie.get(CookieKey.User);
            if (userInCookie) {
                Object.assign(this, userInCookie);
            } else {
                this.$reset();
            }
        },
    }
})
