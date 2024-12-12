<template>
    <div class="common-layout">
        <el-container class="lay-container">
            <!-- 左側邊欄 -->
            <common-aside />
            <el-container>
                <el-header class="el-header">
                     <common-header />
                </el-header>
                <search></search>
                <common-tab></common-tab>
                <el-main class="right-main">
                    <router-view v-if="isRefresh"></router-view> 
                </el-main>
            </el-container>
        </el-container>
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
    .common-layout, .lay-container{
        height:100%;
        display: flex;
    }

    .right-main {
        height: calc(100% - 60px);
    }
</style>
 