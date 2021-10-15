import * as React from 'react'
import { COLOR_MODE_KEY, INITIAL_COLOR_MODE_CSS_PROP } from '../constants/theme'
import { isBrowser } from '../utils/browser'
import COLORS from '../themeColors'

function getThemeMode() {
  let colorMode = 'light'

  if (!isBrowser()) {
    return colorMode
  } else {
    const preferredDarkQuery = window?.matchMedia(
      '(prefers-color-scheme: dark)'
    )
    const prefersDark = preferredDarkQuery.matches
    const persistedPreference = localStorage.getItem(COLOR_MODE_KEY)
    const hasUsedToggle = typeof persistedPreference === 'string'

    if (hasUsedToggle) {
      colorMode = persistedPreference
    } else {
      colorMode = prefersDark ? 'dark' : 'light'
    }
  }

  return colorMode
}

export const ThemeContext = React.createContext(false)

export const ThemeProvider = ({ children }) => {
  const [themeMode, rawSetThemeMode] = React.useState(getThemeMode)

  React.useEffect(() => {
    const root = window.document.documentElement
    const initialColorValue = root.style.getPropertyValue(
      INITIAL_COLOR_MODE_CSS_PROP
    )
    if (initialColorValue) rawSetThemeMode(initialColorValue)
  }, [])

  const contextValue = React.useMemo(() => {
    const setThemeMode = newValue => {
      localStorage.setItem(COLOR_MODE_KEY, newValue)
      const root = window.document.documentElement
      Object.entries(COLORS).forEach(([name, colorByTheme]) => {
        const cssVarName = `--color-${name}`
        root.style.setProperty(cssVarName, colorByTheme[newValue])
      })
      rawSetThemeMode(newValue)
    }
    return { themeMode, setThemeMode }
  }, [themeMode, rawSetThemeMode])

  return (
    <ThemeContext.Provider value={contextValue}>
      {children}
    </ThemeContext.Provider>
  )
}

export default ThemeContext
