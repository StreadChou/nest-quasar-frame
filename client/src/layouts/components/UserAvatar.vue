<template>
    <q-btn flat class="q-pr-md" :to="!$q.screen.gt.sm ? `/user/profile` : undefined" v-if="userStore.isLogin">
        <q-avatar square>
            <img src="https://cdn.quasar.dev/img/avatar.png" alt="avatar">
        </q-avatar>
        <q-menu v-if="$q.screen.gt.sm">
            <q-list>
                <q-item clickable to="/user/profile" v-close-popup>
                    <q-item-section>
                        <div class="text-grey">@{{ userStore.username }}</div>
                        个人中心
                    </q-item-section>
                </q-item>
                <q-separator/>
                <q-item clickable @click="logout" v-close-popup>
                    <q-item-section>退出登录</q-item-section>
                </q-item>
            </q-list>
        </q-menu>
    </q-btn>
</template>

<script lang="ts" setup>
import {useQuasar} from "quasar";
import {CookieKey} from "src/define/cookie.define";
import {useRouter} from "vue-router";
import {onMounted} from "vue";
import {useUserStore} from "stores/user.store";

const $q = useQuasar();
const router = useRouter();
const userStore = useUserStore();

const logout = () => {
    $q.cookies.set(CookieKey.User, "")
    const meta: { auth?: { user?: boolean } } = router.currentRoute.value.meta
    userStore.refreshFromCookie($q.cookies);

    if (meta && meta.auth && meta.auth.user) {
        router.push({path: "/auth/login"});
    }
}

onMounted(() => {
    userStore.refreshFromCookie($q.cookies);
    console.log(router.currentRoute.value.fullPath)
})

</script>

<style scoped>

</style>
