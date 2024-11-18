import { createApp } from 'vue'
import App from './App.vue'
import '@/assets/less/index.less'
import router from './router'
import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'
import * as ElementPlusIconsVue from '@element-plus/icons-vue'
import { createPinia } from 'pinia'


import "@/api/mock.js"
import api from "@/api/api"
import { useAllDateStore } from "@/stores"
import { useSettingStore } from '@/stores/setting.js'

router.beforeEach((to,from)=>{
  // if(to.path !== '/login' && !store.state.token){
  //   return { name:"login" }
  // }
  const publicPages = ['/login', '/register']
  const isPublic = publicPages.includes(to.path)

  if (!isPublic && !store.state.token) {
    return { name: "login" }
  }
})
const pinia = createPinia() 
const app = createApp(App)

app.config.globalProperties.$api = api
app.use(ElementPlus)
app.use(pinia)

const store = useAllDateStore()
const settingStore = useSettingStore()

store.addMenu(router, "refresh")
app.use(router).mount("#app")

for (const [key, component] of Object.entries(ElementPlusIconsVue)) {
    app.component(key, component)
} 

// const savedTheme = localStorage.getItem('systemTheme')
// if (savedTheme) {
//   settingStore.setSystemTheme(savedTheme)
// } else {
//   settingStore.setSystemTheme(SystemThemeEnum.AUTO) // 默認為自動
// }