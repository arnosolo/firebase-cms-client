import { ref } from "vue";

export function useTheme() {
  const theme = ref('bright')
  const setTheme = (newTheme: string) => {
    if (newTheme === 'dark') {
      document.getElementById('app')?.classList.add('dark')
    } else {
      document.getElementById('app')?.classList.remove('dark')
    }
    theme.value = newTheme
    localStorage.setItem('theme', newTheme)
  }

  initTheme()

  function initTheme() {
    const themeSetting = localStorage.getItem('theme')
    if (themeSetting) {
      setTheme(themeSetting)
    } else {
      localStorage.setItem('theme', theme.value)
    }
  }

  return {
    theme,
    setTheme,
  }
}