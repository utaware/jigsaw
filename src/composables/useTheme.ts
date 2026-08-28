import { ref } from 'vue'

import { GlobalThemeCacheKey, getThemeClass } from '@/config/theme'

const isDark = ref<boolean>(false)

export function useTheme() {
  const applyTheme = (isDarkTheme: boolean) => {
    isDark.value = isDarkTheme
    const themeClass = getThemeClass(isDarkTheme)
    if (isDarkTheme) {
      document.documentElement.classList.add(themeClass)
    } else {
      document.documentElement.classList.remove(themeClass)
    }
    localStorage.setItem(GlobalThemeCacheKey, themeClass)
  }

  const toggleTheme = () => {
    applyTheme(!isDark.value)
  }

  const initTheme = () => {
    const savedTheme = localStorage.getItem(GlobalThemeCacheKey)
    if (savedTheme) {
      applyTheme(savedTheme === 'dark')
    } else {
      const prefersDark = window.matchMedia(
        '(prefers-color-scheme: dark)',
      ).matches
      applyTheme(prefersDark)
    }
  }

  return {
    isDark,
    toggleTheme,
    initTheme,
  }
}
