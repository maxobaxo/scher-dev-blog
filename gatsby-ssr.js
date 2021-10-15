/**
 * Implement Gatsby's SSR (Server Side Rendering) APIs in this file.
 *
 * See: https://www.gatsbyjs.com/docs/ssr-apis/
 */

const React = require('react')
const { ThemeProvider } = require('./src/context/theme')
const { COLORS } = require('./src/constants/theme')

function setColorsByTheme() {
  if (typeof window !== 'undefined') {
    return
  } else {
    const preferredDarkQuery = window?.matchMedia(
      '(prefers-color-scheme: dark)'
    )
    const prefersDark = preferredDarkQuery.matches
    const persistedPreference = localStorage.getItem('color-mode')

    let colorMode = 'light'
    const hasUsedToggle = typeof persistedPreference === 'string'

    if (hasUsedToggle) {
      colorMode = persistedPreference
    } else {
      colorMode = prefersDark ? 'dark' : 'light'
    }

    const root = document.documentElement
    root.style.setProperty('--initial-color-mode', colorMode)

    Object.entries(COLORS).forEach(([name, colorByTheme]) => {
      const cssVarName = `--color-${name}`
      root.style.setProperty(cssVarName, colorByTheme[colorMode])
    })
  }
}

const InsertScript = () => {
  const boundFn = String(setColorsByTheme)
  let calledFunction = `(${boundFn})()`
  return (
    <script
      key='custom-theming'
      dangerouslySetInnerHTML={{ __html: calledFunction }}
    />
  )
}

exports.onRenderBody = ({ setHeadComponents }) => {
  setHeadComponents(<InsertScript key='insert-script-theme' />)
}

exports.wrapRootElement = ({ element }) => {
  return <ThemeProvider key='theme-provider-ssr'>{element}</ThemeProvider>
}
