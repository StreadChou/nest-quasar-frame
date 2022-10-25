import {defineStore} from "pinia";
import {useUserStore} from "stores/user.store";

export interface NavigationInterface {
    type: NavigationType,
    text: string,
    href: string;

    icon?: string,
    icon_class?: string;
}

export enum NavigationType {
    Main = "main",
    More = "more",
    Admin = "admin",
    Footer = "footer",
}

const navigation = [
    {type: NavigationType.Main, icon: 'home', text: '主页', href: "/", icon_class: "text-positive"},
    {type: NavigationType.Main, icon: 'bookmarks', text: '普通功能', href: "/", icon_class: "text-info"},

    {type: NavigationType.More, icon: 'person', text: '更多功能', href: "/"},

    {type: NavigationType.Admin, icon: 'person', text: '管理员功能', href: "/"},

    {type: NavigationType.Footer, text: 'Stread.Chou版权所有', href: "/"},
]


export const useGlobalStore = defineStore('global-store', {
    state: () => ({
        navigation: navigation as NavigationInterface[],
    }),
    getters: {
        navigation_main: (state): NavigationInterface[] => {
            return state.navigation.filter((ele) => ele.type === NavigationType.Main);
        },
        navigation_more: (state): NavigationInterface[] => {
            return state.navigation.filter((ele) => ele.type === NavigationType.More);
        },
        navigation_admin: (state): NavigationInterface[] => {
            const userStore = useUserStore();
            if (!userStore.super) return [];
            return state.navigation.filter((ele) => ele.type === NavigationType.Admin);
        },
        navigation_footer: (state): NavigationInterface[] => {
            return state.navigation.filter((ele) => ele.type === NavigationType.Footer);
        }
    },
    actions: {
        getNavigation(): { [key in NavigationType]: NavigationInterface[] } {
            return {
                [NavigationType.Main]: this.navigation_main,
                [NavigationType.More]: this.navigation_more,
                [NavigationType.Admin]: this.navigation_admin,
                [NavigationType.Footer]: this.navigation_footer,
            }
        }
    }
})
