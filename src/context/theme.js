import React, { useState } from 'react'
import { Grommet } from 'grommet'
import { dark, base } from 'grommet/themes'

const darkTheme = {
  ...dark,
  layer: {
    background: '#3E3843',
  },
  heading: {
    font: {
      family: '"Press Start 2P", cursive',
    },
  },
  card: {
    header: {
      width: '100%',
      background: '#5D5464',
    },
    body: {
      background: '',
    },
  },
  global: {
    colors: {
      brand: {
        dark: '#2DC8C8',
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
      family: '"Roboto", sans-serif',
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
}

const lightTheme = {
  ...base,
  name: 'scher.dev.light',
  spacing: 24,
  defaultMode: 'light',
  layer: {
    background: '#F4F5F4',
  },
  global: {
    colors: {
      brand: {
        dark: '#2DC8C8',
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
      family: '"Roboto", sans-serif',
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
      family: '"Lobster Two", cursive',
    },
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

export const ThemeContext = React.createContext(false)

export const ThemeProvider = ({ children }) => {
  const [isDark, setIsDark] = useState(false)

  const toggleDark = () => {
    setIsDark(isDark => !isDark)
  }

  return (
    <ThemeContext.Provider
      value={[isDark, toggleDark, isDark ? darkTheme : lightTheme]}
    >
      <Grommet full theme={isDark ? darkTheme : lightTheme}>
        {children}
      </Grommet>
    </ThemeContext.Provider>
  )
}

export default ThemeContext
