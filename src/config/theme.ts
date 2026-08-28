export const GlobalThemeCacheKey = 'utaware-theme'

export const GlobalThemeConfig = {
  Light: {
    label: '浅色模式',
    className: 'light',
  },
  Dark: {
    label: '深色模式',
    className: 'dark',
  },
} as const

export function getThemeClass(isDarkTheme: boolean) {
  const themeName = isDarkTheme ? 'Dark' : 'Light'
  return Reflect.get(GlobalThemeConfig, themeName).className
}
