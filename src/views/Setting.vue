<template>
  <el-drawer
    size="300px"
    v-model="settingStore.state.isSettingOpen"
    @close="closeDrawer"
    :lock-scroll="false"
    :with-header="false"
    modal-class="setting-modal"
  >
    <div class="drawer-con">
      <div class="close-wrap">
        <el-icon><Close @click="closeDrawer"/></el-icon>
      </div>
    </div>

    <p class="title">主題風格</p>
      <div class="theme-wrap">
        <div
          class="item"
          v-for="(item, index) in settingThemeList"
          :key="item.theme"
          @click="switchTheme(item)"
        >
        <div class="box" 
          :class="{ 'is-active': item.theme === currentTheme }"
          :style="{ '--active-border-color': systemThemeColor }"
        >
            <div class="left-box" :style="{ background: item.color[0] }">
              <div
                v-for="(cItem, idx) in 3"
                :key="idx"
                :class="'line' + idx"
                :style="{ background: item.leftLineColor }"
              ></div>
            </div>
            <div class="right-box" :style="{ background: index === 2 ? item.color[1] : item.color[0] }">
              <div
                v-for="(cItem, idx) in 3"
                :key="idx"
                :class="'line' + idx"
                :style="{ background: item.rightLineColor }"
              ></div>
            </div>
          </div>
          <p class="theme-name">{{ item.name }}</p>
        </div>
      </div>

    <p class="title" style="margin-top: 30px">系統主題色</p>
    <div class="main-color-wrap">
      <div class="offset">
        <div
          v-for="color in mainColor"
          :key="color"
          :style="{ background: color }"
          @click="setElementTheme(color)"
        >
        <el-icon v-show="color === systemThemeColor">
          <Check />
        </el-icon>
      </div>
      </div>
    </div>
  </el-drawer>
</template>

<script setup>
  import { ref, computed, onMounted, watch } from 'vue'
  import { useSettingStore, SystemThemeStyles, getLightColor, getDarkColor } from '@/stores/setting'

  // 主题列表
  const settingThemeList = [
    {
      name: '浅色',
      theme: 'light',
      color: ['#fff', '#fff'],
      leftLineColor: '#EDEEF0',
      rightLineColor: '#EDEEF0'
    },
    {
      name: '深色',
      theme: 'dark',
      color: ['#22252A'],
      leftLineColor: '#3F4257',
      rightLineColor: '#3F4257'
    },
    {
      name: '系统',
      theme: 'auto',
      color: ['#fff', '#22252A'],
      leftLineColor: '#EDEEF0',
      rightLineColor: '#3F4257'
    }
  ]
  const settingStore = useSettingStore()
  const currentTheme = computed(() => settingStore.state.systemTheme)

  const currentGlopTheme = computed(() => settingStore.state.systemThemeType)
  const systemThemeMode = computed(() => settingStore.state.themeStyle)
  const systemThemeColor = computed(() => settingStore.state.systemThemeColor)
  const autoClose = ref(true)

  const closeDrawer = () => {
    settingStore.closeSetting()
  }

  const initSystemTheme = () => {
    const storedTheme = localStorage.getItem('systemTheme') || settingStore.state.systemTheme
    const storedThemeType = localStorage.getItem('systemThemeType') || settingStore.state.systemThemeType

    if (systemThemeMode.value === 'auto') {
      setSystemAutoTheme()
    } else {
      setSystemTheme(currentGlopTheme.value)
    }
    currentTheme.value = systemThemeMode.value
    systemThemeColor.value = systemThemeColor.value
  }

  const setSystemAutoTheme = () => {
    const isDarkMode = window.matchMedia('(prefers-color-scheme: dark)').matches
    setSystemTheme(isDarkMode ? 'dark' : 'light', 'auto')
  }

  const switchTheme = (theme) => {
    if (theme.theme === 'auto') {
      setSystemAutoTheme()
    } else {
      setSystemTheme(theme.theme, theme.theme)
    }
    settingStore.setSystemTheme(theme.theme)
    if (autoClose.value) {
    settingStore.state.isSettingOpen = false
    }
  }

  const setSystemTheme = (theme, themeMode) => {
    let el = document.getElementsByTagName('html')[0]
    let isDark = theme === 'dark'

    themeMode = themeMode || theme

    if (!themeMode) {
      themeMode = theme
    }

    const currentTheme = SystemThemeStyles[theme]

    if (currentTheme) {
      el.setAttribute('class', currentTheme)
    }
    document.documentElement.setAttribute('data-theme', theme)

    let primary = systemThemeColor.value
    for (let i = 1; i <= 9; i++) {
      document.documentElement.style.setProperty(
        `--el-color-primary-light-${i}`,
        isDark ? `${getDarkColor(primary, i / 10)}` : `${getLightColor(primary, i / 10)}`
      )
    }
    setSystemThemeModel(theme, themeMode)
    localStorage.setItem('systemTheme', theme)
    localStorage.setItem('systemThemeType', theme)
  }

  const setSystemThemeModel = (theme, themeMode) => {
    settingStore.setGlopTheme(theme, themeMode)
  }

  const mainColor = ref([
    '#1485FF',
    '#B48DF3',
    '#7A7FFF',
    '#60C041',
    '#38C0FC',
    '#F9901F',
    '#FF80C8'
  ])

  const setElementTheme = (theme) => {
    settingStore.state.systemThemeColor = theme 
    settingStore.setElementTheme(theme)
    if (autoClose.value) {
    settingStore.state.isSettingOpen = false
    }  
  }

  onMounted(() => {
    initSystemTheme()
    watch(() => settingStore.state.isSettingOpen, (isOpen) => {
    if (isOpen) {
      initSystemTheme();
    }
  });
  })
</script>

<style lang="less" scoped>
.box {
  position: relative;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 10px;
  cursor: pointer;
  border: 1px solid #ccc;
  border-radius: 5px;
  transition: border 0.3s;
  margin: 10px 5px;

  &.is-active {
    border: 2px solid;
    border-color: var(--active-border-color, #1485FF);   
  }

  > .left-box,
  > .right-box {
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    align-items: center;
    padding: 5px;
    width: 45%;
  }
}

.selected {
  border: 3px solid #409EFF;
}

.theme-wrap {
  display: flex; 
  justify-content: space-between;
  align-items: center;
  flex-wrap: wrap;
  margin-top: 20px;
}

.item {
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-bottom: 20px;
  cursor: pointer;
  flex: 1 1 30%;
  max-width: 33%;
}

.title {
  text-align: center;
  font-size: 18px;
  margin-bottom: 20px;
  font-weight: bold;
}

.close-wrap {
  position: absolute;
  top: 10px;
  right: 10px;
}

.iconfont {
  font-size: 24px;
  cursor: pointer;
}

.drawer-con {
  position: relative;
}

.theme-name {
  margin-top: 10px;
  text-align: center;
  font-size: 14px;
  color: #333;
}

.main-color-wrap {
  padding-top: 20px;

  .offset {
    display: flex;
    flex-wrap: wrap;
    width: calc(100% + 12.5px);

    @size: 23px;

    > div {
      display: flex;
      align-items: center;
      justify-content: center;
      width: @size;
      height: @size;
      margin: 0 13px 10px 0;
      cursor: pointer;
      border-radius: 50%;

      &:last-of-type {
        margin-right: 0;
      }

      i {
        font-size: 14px;
        color: #fff !important;
      }
    }
  }
}
</style>
