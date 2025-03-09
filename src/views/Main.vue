<template>
    <div class="layout">
        <common-aside></common-aside>
        <div class="main-content">
            <common-header></common-header>
            <search></search>
            <common-tab></common-tab>
            <div class="container">
                <router-view v-if="isRefresh"></router-view>
            </div>
        </div>
    </div>
</template>

<script setup>
    import { ref, nextTick, watch, computed } from 'vue'
    import CommonAside from '@/components/CommonAside.vue'
    import CommonHeader from '@/components/CommonHeader.vue'
    import CommonTab from '@/components/CommonTab.vue'
    import Search from '@/views/Search.vue'
    import { RouterView } from 'vue-router'
    import { useSettingStore } from '@/stores/setting'

    const settingStore = useSettingStore()

    const refresh = computed(() => settingStore.refresh)
    const isRefresh = ref(true)

    watch(refresh, () => {
        reload()
    })

    const reload = () => {
        isRefresh.value = false
        nextTick(() => {
            isRefresh.value = true
        })
    }
</script>

<style scoped lang="less">
    .layout {
        width: 100%;
        min-height: 100vh;
        display: flex;
        flex-direction: row;
        height: 100%;
        box-sizing: border-box;
        // overflow: auto;
        transition: padding 0.3s ease-in-out;
        overscroll-behavior-x: none;
    }

    .main-content {
        display: flex;
        flex-direction: column;
        flex: 1;
        height: 100%;
    }

    .container {
        width: 100%;
        flex: 1;
        overflow: auto;
        padding: 20px;
        box-sizing: border-box;
    }
   
</style>
