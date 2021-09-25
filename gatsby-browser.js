/**
 * Implement Gatsby's Browser APIs in this file.
 *
 * See: https://www.gatsbyjs.com/docs/browser-apis/
 */

// You can delete this file if you're not using it

const React = require('react')
const { ThemeProvider } = require('./src/context/theme')
const { scrollToHash } = require('./src/utils/routing')

exports.wrapRootElement = ({ element }) => {
  return <ThemeProvider>{element}</ThemeProvider>
}

exports.shouldUpdateScroll = ({
  prevRouterProps,
  routerProps: { location },
}) => {
  const prevPath = prevRouterProps?.location?.pathname
  if (location?.pathname !== prevPath && location?.hash) {
    scrollToHash(location.hash)
    return true
  }

  return false
}
