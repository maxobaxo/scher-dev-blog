import React from 'react'
import PropTypes from 'prop-types'
import { Anchor } from 'grommet'
import { navigate } from 'gatsby'
import styled from 'styled-components'

const Link = ({ to, active, ...rest }) => {
  return (
    <Anchor
      href={to}
      onClick={ev => {
        navigate(to)
        ev.preventDefault()
      }}
      {...rest}
    />
  )
}

Link.propTypes = {
  to: PropTypes.string,
  active: PropTypes.bool,
}

const StyledLink = styled(Link)`
  text-decoration: ${props => (props.active ? 'underline' : 'inherit')};
`

export default StyledLink
