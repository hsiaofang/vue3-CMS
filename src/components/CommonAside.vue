<template>
  <div :data-theme="theme">
    <el-aside :width="width">
         <el-menu
            :collapse = "isCollapsed"
            :collapse-transition = "false"
            :default-active = "activeMenu"
            text-color="var(--text-color)"
        >
        <h3 v-show="!isCollapsed">後台管理系統</h3>
        <h3 v-show="isCollapsed">後台</h3>
        <el-menu-item 
            v-for = "item in noChildren"
            :index="item.path"
            :key="item.path"
            @click="handleMenu(item)"
        >
          <component class="icons" :is="item.icon"></component>
          <span>{{ item.label }}</span>
        </el-menu-item>
        <el-sub-menu 
            v-for = "item in hasChildren"
            :index="item.path"
            :key="item.path"
        >
          <template #title>
            <component class="icons" :is="item.icon"></component>
            <span>{{ item.label }}</span> 
          </template>
          <el-menu-item-group>
            <el-menu-item  
                v-for = "(subItem,subIndex) in item.children"
                :index="subItem.path "
                :key="subItem.path"
                @click="handleMenu(subItem)" 
            >
            <component class="icons" :is="subItem.icon"></component>
            <span>{{ subItem.label }}</span> 
            </el-menu-item>
           </el-menu-item-group>
         
        </el-sub-menu>
        
      </el-menu>
    </el-aside>
  </div>
</template>

<script setup>
  import { computed, onMounted } from 'vue'
  import { useRouter, useRoute } from 'vue-router'
  import { useAllDateStore } from '@/stores'
  import { useSettingStore } from '@/stores/setting'

  const list = computed(()=>store.state.menuList)
  const noChildren = computed(()=>list.value.filter(item=>!item.children))
  const hasChildren = computed(()=>list.value.filter(item=> item.children))
  const store = useAllDateStore()
  const isCollapsed = computed(()=>store.state.isCollapse)
  const width = computed(()=> {
    if (window.innerWidth< 500) {
      return '64px';
    }
    return store.state.isCollapse ? '64px' : '180px'
  })
  const router = useRouter()
  const route = useRoute()
  const activeMenu = computed(()=>route.path)
  const handleMenu = (item) => {
      router.push(item.path)
      store.selectMenu(item)
  }
  const settingStore = useSettingStore()
  const theme = computed(() => settingStore.state.systemThemeType)
  
  onMounted(() => {
    window.addEventListener('resize', updateMenuWidth)
    updateMenuWidth()
  })
  const updateMenuWidth = () => {
    if (window.innerWidth < 1180) {
      store.state.isCollapse = true
    } else {
      store.state.isCollapse = false
    }
  }
</script>

<style lang="less" scoped>
  .icons {
    width: 18px;
    height: 18px;
    margin-right: 5px;
  }

  .el-aside {
    height: 100vh;
    overflow-y: auto;
    @media only screen and (max-width: 1180px) {
      .el-menu {
        width: 64px !important;
      }
    }
    @media only screen and (max-width: 900px) {
      .el-menu {
        width: 64px !important;
      }
    }

    @media only screen and (max-width: 600px) {
      .el-menu {
        width: 180px !important;
      }
    }
  }

  .el-menu {
    h3 {
      line-height: 48px;
      text-align: center;
      margin: 0;
    }
  }
</style>