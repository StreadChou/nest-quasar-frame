<template>
    <q-layout view="hHh Lpr lff" class="bg-grey-1">
        <q-header elevated class="bg-white text-grey-8 q-pa-none" height-hint="58">
            <q-toolbar class="q-pa-none">
                <LogoSection v-if="$q.screen.gt.sm"></LogoSection>

                <q-btn flat dense round @click="leftDrawerOpen = !leftDrawerOpen" aria-label="Menu" icon="menu"
                       class="toggle"/>
                <q-space/>

                <UserAvatar/>
            </q-toolbar>
        </q-header>
        <q-drawer v-model="leftDrawerOpen" show-if-above :width="220">
            <q-scroll-area class="fit menu">
                <q-list>
                    <LogoSection v-if="!$q.screen.gt.sm"></LogoSection>
                    <q-item class="sub-menu" v-for="link in globalStore.navigation_main" :key="link.text"
                            :to="link.href" v-ripple
                            clickable>
                        <q-item-section avatar>
                            <q-icon :name="link.icon" size="18px" :class="link.icon_class"/>
                        </q-item-section>
                        <q-item-section>
                            <q-item-label class="text-white">{{ link.text }}</q-item-label>
                        </q-item-section>
                    </q-item>

                    <q-item-label header class="text-weight-bold text-uppercase">
                        更多功能请遵循以下
                    </q-item-label>

                    <q-item class="text-white" v-for="link in globalStore.navigation_more" :key="link.text" v-ripple
                            clickable
                            :to="link.href">
                        <q-item-section avatar>
                            <q-icon color="grey" size="18px" :name="link.icon"/>
                        </q-item-section>
                        <q-item-section>
                            <q-item-label>{{ link.text }}</q-item-label>
                        </q-item-section>
                    </q-item>


                    <q-item-label header class="text-weight-bold text-uppercase q-pb-none q-pt-sm">
                        管理员功能
                    </q-item-label>

                    <q-item class="text-white" v-for="link in globalStore.navigation_admin" :key="link.text" v-ripple
                            clickable
                            :to="link.href">
                        <q-item-section avatar>
                            <q-icon color="grey" size="18px" :name="link.icon"/>
                        </q-item-section>
                        <q-item-section>
                            <q-item-label>{{ link.text }}</q-item-label>
                        </q-item-section>
                    </q-item>

                    <q-separator class="q-mt-md q-mb-lg"/>
                    <div class="q-px-md text-grey-9">
                        <div class="row items-center q-gutter-x-sm q-gutter-y-xs">
                            <a v-for="link in globalStore.navigation_footer" :key="link.text" class="footer-link"
                               :href="link.href">
                                {{ link.text }}
                            </a>
                        </div>
                    </div>
                </q-list>
            </q-scroll-area>
        </q-drawer>
        <q-page-container>
            <router-view/>
        </q-page-container>
    </q-layout>
</template>


<script lang="ts" setup>
import {ref} from 'vue';
import LogoSection from "./components/LogoSection.vue";
import UserAvatar from "layouts/components/UserAvatar.vue";
import {useGlobalStore} from "stores/global.store";

const leftDrawerOpen = ref(false);
const globalStore = useGlobalStore();

</script>


<style lang="sass">
.footer-link
    color: inherit
    text-decoration: none
    font-weight: 500
    font-size: .75rem

    &:hover
        color: #FFF

.menu
    background: #181f24

.sub-menu
    background: #232c32

.toggle
    margin-left: 15px
</style>
