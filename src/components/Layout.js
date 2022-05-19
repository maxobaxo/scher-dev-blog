import * as React from 'react'
import { Footer, Grommet, Text } from 'grommet'
import { useLocation } from '@reach/router'
import Nav from './Nav'
import { lightTheme, darkTheme } from '../constants/theme'
import { ThemeContext } from '../context/theme'
import { scrollToHash } from '../utils/routing'
import { defineCustomElements as deckDeckGoElement } from '@deckdeckgo/highlight-code/dist/loader'

deckDeckGoElement()

const Layout = ({ children }) => {
  const location = useLocation()
  const { themeMode } = React.useContext(ThemeContext)
  
  React.useEffect(() => {
    const { hash } = location
    let scrollTimeout = null
    if (hash) {
      scrollTimeout = setTimeout(() => scrollToHash(hash), 100)
    }
    return () => clearTimeout(scrollTimeout)
  }, [location])


  return (
    <Grommet
      full
      themeMode={themeMode || 'light'}
      theme={themeMode === 'dark' ? darkTheme : lightTheme}
    >
      <Nav location={location} elevation='small' />
      {children}
      <Footer pad='medium' justify='center'>
        <Text textAlign='center'>&copy; Max Scher</Text>
      </Footer>
    </Grommet>
  )
}

export default Layout
