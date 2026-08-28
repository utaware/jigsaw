export const THEME_CACHE_KEY = 'utaware-theme'

export const LightThemeOptions = {
  name: 'light',
  label: '浅色模式',
}

export const DarkThemeOptions = {
  name: 'dark',
  label: '深色模式',
}

export const allThemeOptions = [LightThemeOptions, DarkThemeOptions]

export const DefaultThemeOptions = LightThemeOptions

export function isDarkTheme(theme: string) {
  return theme === DarkThemeOptions.name
}

export function isLightTheme(theme: string) {
  return theme === LightThemeOptions.name
}

export function getToggleTheme(theme: string) {
  return isDarkTheme(theme) ? LightThemeOptions.name : DarkThemeOptions.name
}

export function getThemeOption(theme: string) {
  const option = allThemeOptions.find(option => option.name === theme)
  return option ?? DefaultThemeOptions
}

export function getSystemTheme() {
  const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches
  console.log('prefersDark:', prefersDark)
  return prefersDark ? DarkThemeOptions.name : DefaultThemeOptions.name
}
