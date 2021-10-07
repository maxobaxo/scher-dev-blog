import React, { useState } from 'react'
import { Grommet } from 'grommet'
import { grommet } from 'grommet/themes'

export const ThemeContext = React.createContext(false)

export const ThemeProvider = ({ children }) => {
  const [isDark, setIsDark] = useState(
    localStorage.getItem('preferred-theme') === 'dark'
  )

  const toggleDark = () => {
    setIsDark(isDark => !isDark)
    const newTheme = !isDark === true ? 'dark' : 'false'
    document.documentElement.className = newTheme
    window.__theme = newTheme
    try {
      localStorage.setItem('preferred-theme', `${newTheme}`)
    } catch (e) {}
    let preferredTheme
    try {
      preferredTheme = localStorage.getItem('preferred-theme')
    } catch (e) {}
  }

  const lightTheme = {
    ...grommet,
    name: 'scher.dev.light',
    spacing: 24,
    defaultMode: 'light',
    global: {
      ...grommet.global,
      colors: {
        brand: {
          dark: '#FD6FFF',
          light: '#28AFB0',
        },
        background: {
          dark: '#3E3843',
          light: '#FAFFFD',
        },
        'background-back': {
          dark: '#3E3843',
          light: '#E6EBE9',
        },
        'background-front': {
          dark: '#5D5464',
          light: '#FFFFFF',
        },
        'background-contrast': {
          dark: '#5D5464',
          light: '#11111111',
        },
        text: {
          dark: '#FAFFFD',
          light: '#3E3843',
        },
        'text-strong': {
          dark: '#FFFFFF',
          light: '#000000',
        },
        'text-weak': {
          dark: '#F0F5F3',
          light: '#5D5464',
        },
        'text-xweak': {
          dark: '#999999',
          light: '#867A90',
        },
        border: {
          dark: '#444444',
          light: '#CCCCCC',
        },
        control: {
          light: 'brand',
          dark: 'brand',
        },
        'active-background': {
          light: 'background-contrast',
          dark: 'background-contrast',
        },
        'active-text': {
          light: 'text-strong',
          dark: 'text-strong',
        },
        'selected-background': 'brand',
        'selected-text': 'text-strong',
        'status-critical': '#DF2935',
        'status-warning': '#F1A208',
        'status-ok': '#007EA7',
        'status-unknown': '#CCCCCC',
        'status-disabled': '#CCCCCC',
        'graph-0': 'brand',
        'graph-1': 'status-warning',
        focus: {
          light: 'status-ok',
          dark: 'status-ok',
        },
      },
      font: {
        family: isDark ? "'Open Sans', sans-serif" : '"Roboto", sans-serif',
      },
      active: {
        background: 'active-background',
        color: 'active-text',
      },
      hover: {
        background: 'active-background',
        color: 'active-text',
      },
      selected: {
        background: 'selected-background',
        color: 'selected-text',
      },
      control: {
        border: {
          radius: '4px',
        },
      },
      drop: {
        border: {
          radius: '4px',
        },
      },
    },
    heading: {
      font: {
        family: isDark
          ? "'Annie Use Your Telescope', cursive"
          : '"Lobster Two", cursive',
      },
    },
    header: {
      background: '#FAFFFD',
    },
    card: {
      footer: {
        background: 'background-back',
      },
    },
    button: {
      primary: {
        color: {
          dark: 'light-2',
          light: 'brand',
        },
        background: {
          color: {
            dark: 'light-2',
            light: 'dark-2',
          },
        },
      },
      secondary: {
        border: {
          color: '#3E3843',
        },
      },
    },
  }

  return (
    <ThemeContext.Provider value={[isDark, toggleDark, lightTheme]}>
      <Grommet full theme={lightTheme} themeMode={isDark ? 'dark' : 'light'}>
        {children}
      </Grommet>
    </ThemeContext.Provider>
  )
}

export default ThemeContext
