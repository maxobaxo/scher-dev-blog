import * as React from 'react'
import { Box, Footer, ResponsiveContext, Text } from 'grommet'
import { useLocation } from '@reach/router'
import { scrollToHash } from '../utils/routing'
import styled from 'styled-components'
import Nav from './Nav'

const Layout = ({ children }) => {
  const location = useLocation()
  const responsive = React.useContext(ResponsiveContext)

  React.useEffect(() => {
    const { hash } = location
    let scrollTimeout = null
    if (hash) {
      scrollTimeout = setTimeout(() => scrollToHash(hash), 100)
    }
    return () => clearTimeout(scrollTimeout)
  }, [location])

  return (
    <>
      <Nav location={location} elevation='small' />
      <StyledBox as='main' flex pad='small' responsive={responsive}>
        {children}
        <Footer pad='medium' justify='center'>
          <Text textAlign='center'>&copy; Max Scher</Text>
        </Footer>
      </StyledBox>
    </>
  )
}

const StyledBox = styled(Box)`
  height: ${props =>
    props.responsive === 'small'
      ? `calc(100vh - 84px)`
      : `calc(100vh - 122px)`};
  overflow-y: scroll;
`

export default Layout
