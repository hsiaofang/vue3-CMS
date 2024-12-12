<template>
    <div class="header">
      <div class="l-content">
        <el-button size="small" @click="handleCollapse">
          <component class="icons" is="menu"></component>
        </el-button>
        <el-breadcrumb separator="/" class="bread">
          <el-breadcrumb-item :to="{ path: '/' }">首頁</el-breadcrumb-item>
          <el-breadcrumb-item v-if="current" :to="current.path">{{ current.label }}</el-breadcrumb-item>
        </el-breadcrumb>

        <el-button size="small" @click="reload">
          <component class="icons" is="refresh"></component>
        </el-button>

      </div>
      <div class="r-content">
        <div class="search-wrap">
            <el-input
                v-model="searchText"
                @focus="openSearchDialog"
                class="search-input"
                clearable
            >
              <template #prefix>
                  <div class="left">
                      <component class="icons" is="search"></component>
                      <span>搜索</span>
                  </div>
              </template>
            </el-input>
        </div>
        <el-button size="small" @click="fullScreenFun" v-if="!isFullScreen">
            <component class="icons fullscreen-icon" is="FullScreen"></component>
        </el-button>
        <el-button size="small" @click="exitScreenFun" v-else="!isFullScreen">
            <component class="icons" is="FullScreen"></component>
        </el-button>
        <el-button size="small" @click="handleOpenSetting">
            <component class="icons spin-on-hover" is="setting"></component>
        </el-button>
        <Setting v-if="settingStore.state.isSettingOpen" />
        <el-dropdown>
          <span class="el-dropdown-link">
            <img :src="getImageUrl('user')" class="user" />
          </span>
          <template #dropdown>
            <el-dropdown-menu>
              <el-dropdown-item @click="goToUserPage">個人中心</el-dropdown-item>
              <el-dropdown-item @click="handleLogout">登出</el-dropdown-item>
            </el-dropdown-menu>
          </template>
        </el-dropdown>
      </div>
    </div>
  </template>

<script setup>
  import { ref, computed } from 'vue'
  import { useRouter } from 'vue-router'
  import { useAllDateStore } from '@/stores'
  import { useSettingStore } from '@/stores/setting'
  import Setting from '@/views/Setting.vue'

  const store = useAllDateStore()
  const settingStore = useSettingStore()
  const theme = ref('light')

  const handleCollapse = () => {
      store.state.isCollapse = !store.state.isCollapse
  }

  const handleOpenSetting = () => {
      settingStore.state.isSettingOpen = !settingStore.state.isSettingOpen
  }

  const router = useRouter()
  const goToUserPage = () => {
      router.push('/user')
  }
  const handleLogout = () => {
      store.clean()
      router.push('/login')
  }

  const current = computed(() => store.state.currentMenu)

  const getImageUrl = (user) => {
      return new URL(`../assets/images/${user}.png`, import.meta.url).href
  }

  const isFullScreen = ref(false)

  const fullScreenFun = () => {
      const el = document.documentElement
      const requestFullscreen =
      el.requestFullscreen ||
      el.webkitRequestFullscreen ||
      el.mozRequestFullScreen ||
      el.msRequestFullscreen

      if (requestFullscreen) {
      requestFullscreen.call(el)
      isFullScreen.value = true
      } else {
      ElMessage.error('不支援')
      }
  }

  const exitScreenFun = () => {
      const exitFullscreen =
      document.exitFullscreen ||
      document.webkitExitFullscreen ||
      document.mozCancelFullScreen ||
      document.msExitFullscreen

      exitFullscreen.call(document)
      isFullScreen.value = false
  }

  const reload = () => {
    setTimeout(() => {
      settingStore.reload()
    })
  }

</script>
  
<style lang="less" scoped>
  .header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    width: 100%;
    height: 60px;
  }
  .icons {
    width: 20px;
    height: 20px;
    transition: transform 0.3s ease-in-out;
  }

  .fullscreen-icon:hover {
    transform: scale(1.2);
  }

  .spin-on-hover:hover {
    transform: rotate(360deg);
  }
  
  .l-content {
    display: flex;
    align-items: center;
    .el-button {
      margin-right: 20px;
      border: none;
      background: transparent;
    }
  }
  
  .r-content {
    display: flex;
    justify-content: space-between;
    align-items: center;
    .search-wrap {
      margin-right: 20px;
    }
    .user {
      width: 20px;
      height: 20px;
      border-radius: 50%;
    }
    .el-button {
      margin-right: 20px;
      border: none;
      background: transparent;
    }
  }
  
  .screen-box {
    cursor: pointer;
    margin-right: 20px;
    .btn {
      display: flex;
      justify-content: center;
      align-items: center;
      width: auto;
      height: auto;
      border-radius: 50%;
      background-color: transparent;
      color: var(--primary-color);
      font-size: 20px;
      &:hover {
        background-color: transparent;
        color: var(--primary-color-dark);
      }
    }
  }
  
  :deep(.bread span) {
    color: var(--text-color) !important;
    cursor: pointer !important;
  }
</style>
  