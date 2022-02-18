import * as React from 'react'
import { Box, Footer, Grommet, ResponsiveContext, Text } from 'grommet'
import { useLocation } from '@reach/router'
import styled from 'styled-components'
import Nav from './Nav'
import { lightTheme, darkTheme } from '../constants/theme'
import { ThemeContext } from '../context/theme'
import { scrollToHash } from '../utils/routing'

const Layout = ({ children }) => {
  const location = useLocation()
  const responsive = React.useContext(ResponsiveContext)
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
      <StyledBox as='main' flex pad='small' responsive={responsive}>
        {children}
        <Footer pad='medium' justify='center'>
          <Text textAlign='center'>&copy; Max Scher</Text>
        </Footer>
      </StyledBox>
    </Grommet>
  )
}

const StyledBox = styled(Box)`
  height: ${props =>
    props.responsive === 'small'
      ? `calc(100vh - 84px)`
      : `calc(100vh - 122px)`};
`

export default Layout
