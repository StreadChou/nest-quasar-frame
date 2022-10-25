import {boot} from 'quasar/wrappers';
import axios, {AxiosInstance} from 'axios';
import {Cookies} from "quasar";
import {CookieKey, CookieUserInterface} from "src/define/cookie.define";

declare module '@vue/runtime-core' {
    interface ComponentCustomProperties {
        $axios: AxiosInstance;
    }
}

// Be careful when using SSR for cross-request state pollution
// due to creating a Singleton instance here;
// If any client changes this (global) instance, it might be a
// good idea to move this instance creation inside of the
// "export default () => {}" function below (which runs individually
// for each client)
const api = axios.create({baseURL: process.env.API_URL});
const apiWithError = axios.create({baseURL: process.env.API_URL});

export default boot(({app}) => {
    const cookies = Cookies // otherwise we're on client
    if (cookies.has(CookieKey.User)) {
        const user: CookieUserInterface = cookies.get(CookieKey.User);
        api.defaults.headers = {Authorization: `Bearer ${user.access_token}`};
        apiWithError.defaults.headers = {Authorization: `Bearer ${user.access_token}`};
    } else {
        api.defaults.headers = {};
        apiWithError.defaults.headers = {};
    }
    // for use inside Vue files (Options API) through this.$axios and this.$api

    app.config.globalProperties.$axios = axios;
    // ^ ^ ^ this will allow you to use this.$axios (for Vue Options API form)
    //       so you won't necessarily have to import axios in each vue file

    app.config.globalProperties.$api = api;
    app.config.globalProperties.$apiWithError = apiWithError;
    // ^ ^ ^ this will allow you to use this.$api (for Vue Options API form)
    //       so you can easily perform requests against your app's API
});

export {api, apiWithError};
