/**
 * Implement Gatsby's SSR (Server Side Rendering) APIs in this file.
 *
 * See: https://www.gatsbyjs.com/docs/ssr-apis/
 */

const React = require('react')
const { ThemeProvider } = require('./src/context/theme')

exports.wrapRootElement = ({ element }) => {
  return (
    <ThemeProvider>
      {element}
    </ThemeProvider>
  )
}