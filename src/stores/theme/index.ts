import { defineStore } from 'pinia'

import {
  THEME_CACHE_KEY,
  getSystemTheme,
  getToggleTheme,
  isDarkTheme,
} from '@/config/theme'

export const useThemeStore = defineStore('theme', {
  state: () => ({
    currentTheme: '',
  }),
  actions: {
    // 设置主题
    setTheme(theme: string) {
      document.documentElement.classList = `${theme}`
      localStorage.setItem(THEME_CACHE_KEY, theme)
      this.currentTheme = theme
    },
    // 初始化主题
    initTheme() {
      const cacheTheme = localStorage.getItem(THEME_CACHE_KEY)
      const theme = cacheTheme ?? getSystemTheme()
      this.setTheme(theme)
    },
    // 切换明、暗主题
    toggleTheme() {
      const nextTheme = getToggleTheme(this.currentTheme)
      this.setTheme(nextTheme)
    },
  },
  getters: {
    isDark: state => isDarkTheme(state.currentTheme),
  },
})
