import * as React from 'react'
import { Box, Heading, Paragraph } from 'grommet'
import { Code, LinkDown } from 'grommet-icons'
import styled from 'styled-components'
import Typical from 'react-typical'
import AnchorLink from '../components/shared/AnchorLink'

const Hero = () => {
  const [typed, setTyped] = React.useState(false)

  setTimeout(() => setTyped(true), 7500)

  return (
    <StyledBox
      id='home'
      height={{ min: '85vh' }}
      flex
      align='center'
      pad='medium'
    >
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
            <Code size='large' />
          </Box>

          <AnchorLink hash='#about' page='/' label='' icon={<LinkDown />} />
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
    </StyledBox>
  )
}

const StyledBox = styled(Box)`
  position: relative;
  overflow: hidden;
`

export default Hero
