<template>
  <div :data-theme="theme">
    <el-aside :width="width">
         <el-menu
            :collapse = "isCollapsed"
            :collapse-transition = "false"
            :default-active = "activeMenu"
            background-color="var(--primary-colo)"
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
import  {ref,computed,onMounted} from 'vue'
import {useRouter,useRoute} from 'vue-router'
import {useAllDateStore} from '@/stores'
import { useSettingStore, SystemThemeStyles, getLightColor, getDarkColor } from '@/stores/setting'

// const list = ref([
//     {
//         path:'/home',
//         name:'home',
//         label: "首頁",
//         icon: 'house',
//         url: 'Home'
//     },
//     {
//         path:'/mall',
//         name:'mall',
//         label: "商品管理",
//         icon: 'video-play',
//         url: 'Mall'
//     },
//     {
//         path:'/user',
//         name:'user',
//         label: "用戶管理",
//         icon: 'user',
//         url: 'user'
//     },
//     {
//         path:'/other',
//         label: "其他",
//         icon: 'location',
//         children: [
//             {
//                 path:'/page1',
//                 name:'page1',
//                 label: "頁面1",
//                 icon: 'setting',
//                 url: 'Page1'
//             },
//             {
//                 path:'/page2',
//                 name:'page2',
//                 label: "頁面2",
//                 icon: 'setting',
//                 url: 'Page2'
//             },
//         ]
//     },
// ])
const list = computed(()=>store.state.menuList)
const noChildren = computed(()=>list.value.filter(item=>!item.children))
const hasChildren = computed(()=>list.value.filter(item=> item.children))
const store = useAllDateStore()
const isCollapsed = computed(()=>store.state.isCollapse)
const width = computed(()=>store.state.isCollapse ? '64px' : '180px')
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
  document.documentElement.setAttribute('data-theme', theme.value);

  })

</script>

<style lang="less" scoped>

.icons {
  width: 18px;
  height: 18px;
  margin-right: 5px;
}

.el-menu {
  border-right: none;
  h3 {
    line-height: 48px;
    color: #fff;
    text-align: center;
    margin: 0;
  }

  .el-menu-item {
    &:hover {
      // background-color: var(--menu-item-hover-bg);
      // color: var(--menu-item-hover-color);
    }
  }
}

.aside {
    // background-color: var(--aside-bg-color);
    height: 100vh;
}
</style>