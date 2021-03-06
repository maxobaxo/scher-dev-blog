import React from 'react'
import PropTypes from 'prop-types'
import { Anchor, Box, Text } from 'grommet'
import { navigate } from 'gatsby'
import styled from 'styled-components'
import { useLocation } from '@reach/router'
import { scrollToHash } from '../../utils/routing'

/**
 * Custom Link component
 *
 * @param {object} props React component props
 * @param {string} page Target page for navigation
 * @param {string} label label for the link
 * @param {bool} active Indicates if the route for the given link is the current route
 */
const Link = ({ page, hash, label, active, icon }) => {
  const location = useLocation()
  const handleClick = evt => {
    evt.preventDefault()
    if (location.pathname !== page) {
      navigate(`${page}${hash}`, { state: { path: page } })
    } else {
      scrollToHash(hash)
      setTimeout(() => {
        navigate(`${page}${hash}`)
      }, 1000)
    }
  }
  return (
    <StyledBox align='center'>
      <StyledAnchor
        label={!icon && label}
        icon={icon || null}
        onClick={handleClick}
        pad='none'
      />
      {icon && (
        <Anchor onClick={handleClick}>
          <Text size='small'>{label}</Text>
        </Anchor>
      )}
    </StyledBox>
  )
}

Link.propTypes = {
  page: PropTypes.string,
  hash: PropTypes.string,
  label: PropTypes.oneOfType([PropTypes.node, PropTypes.string]),
  active: PropTypes.bool,
  icon: PropTypes.node,
}

Link.defaultProps = {
  hash: '',
}

const StyledAnchor = styled(Anchor)`
  padding: 0;
`

const StyledBox = styled(Box)`
  &:hover a {
    text-decoration: underline;
  }
`

const StyledLink = styled(Link)`
  & > a {
    text-decoration: ${props => (props.active ? 'underline' : 'inherit')};
  }
`

export default StyledLink
