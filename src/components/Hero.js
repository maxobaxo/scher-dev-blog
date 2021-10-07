import * as React from 'react'
import { Box, Heading, ResponsiveContext, Paragraph } from 'grommet'
import { Code, LinkDown } from 'grommet-icons'
import styled from 'styled-components'
import Typical from 'react-typical'
import AnchorLink from '../components/shared/AnchorLink'

const Hero = () => {
  const responsive = React.useContext(ResponsiveContext)
  const [typed, setTyped] = React.useState(false)

  setTimeout(() => setTyped(true), 7500)

  return (
    <StyledBox
      id='home'
      flex
      align='center'
      justify='between'
      pad='medium'
      isSmall={responsive === 'small'}
    >
      <Box align='center'>
        <Heading as='p' level={1} size='large'>
          hi, i'm max
        </Heading>
        {typed ? (
          <Box
            justify='between'
            align='center'
            fill='vertical'
            direction='column'
          >
            <Box align='center'>
              <Paragraph fill size='large'>
                i'm a software engineer.
              </Paragraph>
              <Code size='large' color='brand' />
            </Box>
          </Box>
        ) : (
          <Paragraph fill size='large'>
            <Typical
              steps={[
                "i'm a",
                1500,
                "i'm a dad",
                1000,
                "i'm a developer",
                500,
                "i'm a dork",
                500,
                "i'm a software engineer.",
                1000,
              ]}
              wrapper='span'
            />
          </Paragraph>
        )}
      </Box>
      <AnchorLink
        hash='#about'
        page='/'
        label=''
        icon={<LinkDown size='large' />}
        alignSelf='end'
      />
    </StyledBox>
  )
}

const StyledBox = styled(Box)`
  position: relative;
  overflow: hidden;
  height: ${props =>
    props.isSmall ? `calc(100vh - 84px)` : `calc(100vh - 122px)`};
`

export default Hero
