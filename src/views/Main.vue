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
                <el-main class="right-mainn">
                    <router-view></router-view> 
                </el-main>
            </el-container>
        </el-container>
    </div>
</template>
<script setup>
import CommonAside from '@/components/CommonAside.vue'
import CommonHeader from '@/components/CommonHeader.vue'
import CommonTab from '@/components/CommonTab.vue'
import Search from '@/views/Search.vue'
import { RouterView } from 'vue-router'
</script>

<style scoped lang="less">
.common-layout, lay-container{
    height:100%;
}
.el-header{
    background-color: #333;
}
</style>
 