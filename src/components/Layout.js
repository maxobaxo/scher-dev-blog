import * as React from 'react'
import { Box, Footer, Layer, Text } from 'grommet'
import { useLocation } from '@reach/router'
import { scrollToHash } from '../utils/routing'

import Nav from './Nav'

const Layout = ({ children }) => {
  const location = useLocation()

  React.useEffect(() => {
    const { hash } = location
    if (hash) {
      setTimeout(() => scrollToHash(hash), 100)
    }
  }, [location])

  return (
    <Layer full={true} modal={false} animation='none'>
      <Nav location={location} elevation='small' />
      <Box as='main' flex overflow='auto' pad='small'>
        {children}
        <Footer pad='medium' justify='center'>
          <Text textAlign='center'>&copy; Max Scher</Text>
        </Footer>
      </Box>
    </Layer>
  )
}

export default Layout
