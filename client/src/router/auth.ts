import {NavigationGuardNext, RouteLocationNormalized} from "vue-router";
import {Cookies} from 'quasar'
import {CookieKey, CookieUserInterface} from "src/define/cookie.define";
import {Helper} from "boot/helper";

export const UserOnly = {user: true}
export const SuperOnly = {user: true, super: true};
export const AuthPage = {authPage: true};

export function AuthBeforeEach(cookie: Cookies, to: RouteLocationNormalized, from: RouteLocationNormalized, next: NavigationGuardNext) {
    const toMeta: { auth?: { authPage: boolean, user: boolean, super: boolean } } = to.meta;
    const user: CookieUserInterface = cookie.get(CookieKey.User);
    if (toMeta.auth?.authPage && user) {
        return next({path: '/user/profile'});
    }
    if (!toMeta || !toMeta.auth) return next();
    if (toMeta.auth.user && !user) {
        return next({path: "/auth/login"});
    }
    if (toMeta.auth.super && !user.super) {
        const helper = Helper;
        helper.getInstance().notify.negative("您无权访问此页面")
        return next({path: "/user/profile"});
    }

    return next();
}
