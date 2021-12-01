import * as React from 'react'
import {
  Anchor,
  Box,
  Button,
  Card,
  CardHeader,
  CardBody,
  Heading,
  Nav,
  Paragraph,
} from 'grommet'
import { Github, Linkedin, Twitter } from 'grommet-icons'
import Layout from '../components/Layout'
import Hero from '../components/Hero'
import Seo from '../components/Seo'
import TwoTruths from '../components/TwoTruths'

const Home = ({ location }) => {
  const [gameOpen, setGameOpen] = React.useState(false)

  return (
    <Layout location={location}>
      <Seo title='Max Scher' />
      <Hero />
      <Box
        id='about'
        height={{ min: 'max-content' }}
        align='center'
        pad='large'
        background={{ color: 'background-back' }}
      >
        <Card
          width='large'
          align='center'
          elevation='large'
          background={{ color: 'background' }}
        >
          <CardHeader
            justify='center'
            pad={{
              bottom: 'none',
              top: 'medium',
              right: 'medium',
              left: 'medium',
            }}
          >
            <Heading level={2} margin={{ bottom: 'none' }}>
              The Get-to-Know-Me Game
            </Heading>
          </CardHeader>
          <CardBody pad='medium'>
            <Paragraph fill>
              In my twenties, I "accidentally" built a career selling and
              marketing movies, but it never felt quite right. So, I took the
              leap, and enrolled in a{' '}
              <Anchor href='https://epicodus.com' target='_blank'>
                coding bootcamp
              </Anchor>
              . Best career decision I ever made.
            </Paragraph>
            <Paragraph fill>
              I'm currently a full stack Software Engineer at{' '}
              <Anchor href='https://nike.com' target='_blank'>
                Nike
              </Anchor>
              , where I work with React, Node, GraphQL, Jenkins, and AWS (S3,
              ECS, RDS). Would you like to get to know me better?
            </Paragraph>

            <Box align='center' pad='medium'>
              <Button label="Let's Play" onClick={() => setGameOpen(true)} />
              {gameOpen && <TwoTruths setGameOpen={setGameOpen} />}
            </Box>
          </CardBody>
        </Card>
      </Box>
      <Box
        id='contact'
        pad='medium'
        align='center'
        height={{ min: 'max-content' }}
        margin={{ bottom: 'large' }}
      >
        <Heading level={2}>Connect</Heading>
        <Nav direction='row'>
          <Anchor
            href='https://github.com/maxobaxo'
            icon={<Github size='large' />}
            size='large'
            target='_blank'
          />
          <Anchor
            href='https://linkedin.com/in/maxscher'
            icon={<Linkedin size='large' />}
            size='large'
            target='_blank'
          />
          <Anchor
            href='https://twitter.com/maxobaxo'
            icon={<Twitter size='large' />}
            size='large'
            target='_blank'
          />
        </Nav>
        <Paragraph fill textAlign='center'>
          Feel free to reach out! I'm always happy to connect and talk about the
          wild world of web development
        </Paragraph>
      </Box>
    </Layout>
  )
}

export default Home
