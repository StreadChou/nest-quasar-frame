<template>
    <q-page class="secondary-to-primary-bg-15deg row items-center justify-evenly">
        <q-card class="main col-xs-10 col-md-6 text-center q-py-xl">
            <q-card-section class="q-pt-none q-mt-none">
                <h1 class="q-pa-none q-ma-none">注册</h1>
            </q-card-section>
            <q-card-section class="q-gutter-y-md q-px-md">
                <q-input standout v-model="form.username" label="用户名"/>
                <q-input standout v-model="form.email" label="邮箱"/>
                <q-input standout v-model="form.password" label="密码" type="password"/>
                <q-input standout v-model="form.confirm_password" label="确认密码" type="password"/>
                <q-btn class="full-width primary-to-secondary-bg-15deg" label="注册" @click="register"/>
            </q-card-section>
            <q-card-section>
                已经有账号了? <q-btn flat dense unelevated to="/auth/login">去登录吧</q-btn>
            </q-card-section>
        </q-card>
    </q-page>
</template>

<script setup lang="ts">
import {ref} from "vue";
import {api} from "boot/axios";
import {useQuasar} from "quasar";
import {CookieKey} from "src/define/cookie.define";
import {useRouter} from "vue-router";
import {useUserStore} from "stores/user.store";

const $q = useQuasar();
const router = useRouter();
const userStore = useUserStore();

const form = ref({
    username: "stread",
    email: "stread.chou@gmail.com",
    password: "1234567",
    confirm_password: "1234567"
})

const register = async () => {
    const res = await api.post("/auth/register", form.value)
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
