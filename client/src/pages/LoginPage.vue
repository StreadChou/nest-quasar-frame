<template>
    <q-page class="primary-to-secondary-bg-15deg row items-center justify-evenly">
        <q-card class="main col-xs-10 col-md-6 text-center q-py-xl">
            <q-card-section class="q-pt-none q-mt-none">
                <h1 class="q-pa-none q-ma-none">登录</h1>
            </q-card-section>
            <q-card-section class="q-gutter-y-md q-px-md">
                <q-input standout v-model="form.username" label="用户名"/>
                <q-input standout v-model="form.password" label="密码" type="password"/>
                <q-btn class="full-width secondary-to-primary-bg-15deg" label="登录" @click="login"/>
            </q-card-section>
            <q-card-section>
                没有账号? <q-btn flat dense unelevated to="/auth/register">去注册一个</q-btn>
            </q-card-section>
        </q-card>
    </q-page>
</template>

<script setup lang="ts">
import {useQuasar} from "quasar";
import {ref} from "vue";
import {api} from "boot/axios";
import {CookieKey} from "src/define/cookie.define";
import {useRouter} from "vue-router";
import {useUserStore} from "stores/user.store";

const $q = useQuasar();
const router = useRouter();
const userStore = useUserStore();

const form = ref({
    username: "stread",
    password: "1234567",
})

const login = async () => {
    const res = await api.post("/auth/login", form.value)
    if (res.data && res.data.access_token) {
        $q.cookies.set(CookieKey.User, res.data)
        userStore.refreshFromCookie($q.cookies);
        router.push({path: "/"}).then();
    }
}

</script>

<style scoped>
.main {
    background: rgb(255 255 255 / 80%) !important
}

.main h1 {
    font-size: 32px !important;
    line-height: 32px;
}
</style>
