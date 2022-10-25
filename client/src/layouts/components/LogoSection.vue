<template>
    <q-btn flat no-caps no-wrap class="bg-secondary text-white no-border-radius q-ml-none logo">
        <q-toolbar-title shrink class="text-weight-bold">stread</q-toolbar-title>
    </q-btn>
</template>

<script lang="ts">
import {defineComponent} from "vue";

export default defineComponent({
    name: "LogoSection"
})
</script>

<style scoped lang="sass">
.logo
    height: 50px
    width: 220px

    img
        height: 24px
        width: 24px
</style>
