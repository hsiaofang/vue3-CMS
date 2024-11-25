import { defineStore } from 'pinia'
import { ref, reactive, watch, computed} from 'vue'
import { ThemeList, ElementPlusTheme, DarkMenuStyles } from '@/config/setting'

export const SystemThemeStyles = {
    dark : 'dark',
    light : 'light',
    auto : 'auto'
}

function initState() {
    const sys = JSON.parse(localStorage.getItem('sysSettings')) || {} 

    return {
        isSettingOpen: sys.isSettingOpen || false,
        autoClose: localStorage.getItem('autoClose') === 'true' || false,
        themeColor: localStorage.getItem('themeColor') || '#409EFF',
        themeStyle: localStorage.getItem('themeStyle') || 'light',
        systemTheme: localStorage.getItem('systemTheme') || 'auto',
        systemThemeType: localStorage.getItem('systemThemeType') || 'light',
        systemThemeColor: sys.systemThemeColor || ElementPlusTheme.primary,
    }
}

export const useSettingStore = defineStore('settingStore', () => {
    const state = reactive(initState())
    
    function reload() {
        state.value = initState()
    }  

    function setThemeColor(color) {
        state.value.themeColor = color
        localStorage.setItem('themeColor', color)
    }

    function setThemeStyle(style) {
        state.themeStyle = style 
        localStorage.setItem('themeStyle', style)
    }

    function setSystemTheme(theme) {
        state.systemTheme = theme
        localStorage.setItem('systemTheme', theme)
        console.log('Updated systemTheme:', state.systemTheme)

    }

    function setGlopTheme(theme, themeMode) {
        state.systemThemeType = theme
        state.systemThemeMode = themeMode
        localStorage.setItem('systemThemeType', theme)
        localStorage.setItem('systemThemeMode', themeMode)
    }

    function openSetting() { state.isSettingOpen = true }
    function closeSetting() { state.isSettingOpen = false }
    
    function setElementTheme(theme) {
        setElementThemeColor(theme)
    }

    return {
        state,
        reload,
        setThemeColor,
        setThemeStyle,
        setSystemTheme,
        setGlopTheme,
        openSetting,
        closeSetting,
        initState,
        setElementTheme
    }
})

function setElementThemeColor(color) {
    const mixColor = '#ffffff'
    const elStyle = document.documentElement.style

    elStyle.setProperty('--el-color-primary', color)

    for (let i = 1; i < 16; i++) {
        const ratio = i / 16
        const r1 = parseInt(color.substring(1, 3), 16)
        const g1 = parseInt(color.substring(3, 5), 16)
        const b1 = parseInt(color.substring(5, 7), 16)
        const r2 = parseInt(mixColor.substring(1, 3), 16)
        const g2 = parseInt(mixColor.substring(3, 5), 16)
        const b2 = parseInt(mixColor.substring(5, 7), 16)

        let r = Math.round(r1 * (1 - ratio) + r2 * ratio)
        let g = Math.round(g1 * (1 - ratio) + g2 * ratio)
        let b = Math.round(b1 * (1 - ratio) + b2 * ratio)

        r = ('0' + (r || 0).toString(16)).slice(-2)
        g = ('0' + (g || 0).toString(16)).slice(-2)
        b = ('0' + (b || 0).toString(16)).slice(-2)
        const itemColor = `#${r}${g}${b}`

        elStyle.setProperty(`--el-color-primary-custom-${i}`, itemColor)
    }
}

export function getLightColor(color, level) {
    const reg = /^#?[0-9A-Fa-f]{6}$/
    if (!reg.test(color)) return null
    const rgb = hexToRgb(color)

    for (let i = 0; i < 3; i++) {
        rgb[i] = Math.round(255 * level + rgb[i] * (1 - level))
    }
    return rgbToHex(rgb[0], rgb[1], rgb[2])
}

function hexToRgb(str) {
    let hexs = ''
    const reg = /^#?[0-9A-Fa-f]{6}$/
    if (!reg.test(str)) return null
    str = str.replace('#', '')
  
    hexs = str.match(/../g)
  
    for (let i = 0; i < 3; i++) hexs[i] = parseInt(hexs[i], 16)
    return hexs
}

function rgbToHex(r, g, b) {
    const reg = /^\d{1,3}$/
    if (!reg.test(r) || !reg.test(g) || !reg.test(b)) return null
    const hexs = [r.toString(16), g.toString(16), b.toString(16)]
  
    for (let i = 0; i < 3; i++) if (hexs[i].length == 1) hexs[i] = `0${hexs[i]}`
  
    return `#${hexs.join('')}`
}

export function getDarkColor(color, level) {
    const reg = /^#?[0-9A-Fa-f]{6}$/
    if (!reg.test(color)) return null
    const rgb = hexToRgb(color)
    for (let i = 0; i < 3; i++) rgb[i] = Math.round(20.5 * level + rgb[i] * (1 - level))
    return rgbToHex(rgb[0], rgb[1], rgb[2])
  }
