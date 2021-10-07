import * as React from 'react'
import {
  Box,
  Button,
  Form,
  FormField,
  Heading,
  Layer,
  Paragraph,
  Anchor,
  RadioButtonGroup,
} from 'grommet'
import { Close, StatusGood, StatusWarning } from 'grommet-icons'
import styled from 'styled-components'

const TwoTruths = ({ setGameOpen }) => {
  const initialForm = {
    allergies: '',
    studio: '',
    nonprofit: '',
  }
  const [form, setForm] = React.useState(initialForm)
  const [formSubmitted, setFormSubmitted] = React.useState(false)
  const [score, setScore] = React.useState({
    value: 0,
    status: '',
    message: '',
  })

  React.useEffect(() => {
    if (formSubmitted) {
      scrollToBottom()
    } else {
      scrollToTop()
    }
  }, [formSubmitted])

  const scrollToTop = () => {
    const el = document.getElementById('form-title')
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' })
    }
  }

  const scrollToBottom = () => {
    const el = document.getElementById('button-box')
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' })
    }
  }

  const handleValidate = () => {
    let correct = 0

    const correctAnswers = {
      allergies: 'gluten',
      studio: 'bros',
      nonprofit: 'srf',
    }

    const total = Object.keys(form).length
    for (const fieldName in form) {
      if (form[fieldName] === correctAnswers[fieldName]) {
        correct += 1
      }
    }

    let status = ''
    let message = ''
    switch (correct) {
      case 0:
        status = 'critical'
        message = 'Oof. Are we even friends? Try again, maybe?'
        break
      case 1:
        status = 'critical'
        message = '1/3, really? Study up, buttercup.'
        break
      case 2:
        status = 'critical'
        message = "You did better than some, but you're no BFF."
        break
      case 3:
        status = 'ok'
        message = "100%, stalker. You must've hacked my insta."
        break
      default:
        break
    }

    setFormSubmitted(true)
    setScore({ value: `${correct}/${total}`, status, message })
  }

  const handleReset = () => {
    setFormSubmitted(false)
    setScore(0)
    setForm(initialForm)
  }

  const handleChange = evt => {
    const {
      target: { name, value },
    } = evt
    if (formSubmitted) {
      return
    }
    const newForm = { ...form }
    newForm[name] = value
    setForm(newForm)
  }

  return (
    <Layer
      animation='fadeIn'
      position='center'
      modal={true}
      margin='none'
      onEsc={() => setGameOpen(false)}
      onClickOutside={() => setGameOpen(false)}
    >
      <CloseButton
        alignSelf='end'
        icon={<Close />}
        onClick={() => setGameOpen(false)}
      />
      <Box pad='medium' overflow='auto'>
        <Heading id='form-title' level={3}>
          How well do you know me?
        </Heading>
        <Form
          onValidate={handleValidate}
          onReset={handleReset}
          validate='submit'
        >
          <FormField
            id='allergies'
            name='allergies'
            label={
              <Paragraph margin='none'>
                Which of these foods am I <em>not</em> allergic to?
              </Paragraph>
            }
            validate={value => {
              const result = {
                message: '',
                status: '',
              }
              switch (value) {
                case 'gluten':
                  result.message = (
                    <Box direction='row' align='center'>
                      <StatusGood color='status-ok' />
                      <Paragraph
                        size='small'
                        margin={{ left: 'small' }}
                        color='status-ok'
                      >
                        I'm all about that bread, 'bout that bread.
                      </Paragraph>
                    </Box>
                  )
                  result.status = 'info'
                  break
                case 'nuts':
                  result.message = (
                    <Box direction='row' align='center'>
                      <StatusWarning color='status-critical' />
                      <Paragraph
                        size='small'
                        margin={{ left: 'small' }}
                        color='status-critical'
                      >
                        I'm convinced I'll be taken out by a pistachio.
                      </Paragraph>
                    </Box>
                  )
                  break
                case 'dairy':
                  result.message = (
                    <Box direction='row' align='center'>
                      <StatusWarning color='status-critical' />
                      <Paragraph
                        size='small'
                        margin={{ left: 'small' }}
                        color='status-critical'
                      >
                        Milk will <em>not</em> do this body good.
                      </Paragraph>
                    </Box>
                  )
                  break
                default:
                  result.message = (
                    <Box direction='row' align='center'>
                      <StatusWarning color='status-critical' />
                      <Paragraph
                        size='small'
                        margin={{ left: 'small' }}
                        color='status-critical'
                      >
                        You forgot to answer this question, pal.
                      </Paragraph>
                    </Box>
                  )
                  break
              }
              return result
            }}
          >
            <RadioButtonGroup
              id='allergies'
              name='allergies'
              aria-labelledby='allergies'
              value={form.allergies}
              onChange={handleChange}
              options={[
                { label: 'Dairy Products', value: 'dairy' },
                { label: 'All Nuts', value: 'nuts' },
                { label: 'Gluten', value: 'gluten' },
              ]}
            />
          </FormField>
          <FormField
            id='studio'
            name='studio'
            label={
              <Paragraph margin='none'>
                Which of these film companies have I <em>not</em> worked for?
              </Paragraph>
            }
            validate={value => {
              const result = {
                message: '',
                status: '',
              }
              switch (value) {
                case 'bros':
                  result.message = (
                    <Box direction='row' align='center'>
                      <StatusGood color='status-ok' />
                      <Paragraph
                        margin={{ left: 'small' }}
                        size='small'
                        color='status-ok'
                      >
                        I was never really one of the bros.
                      </Paragraph>
                    </Box>
                  )
                  result.status = 'info'
                  break
                case 'think':
                  result.message = (
                    <Box direction='row' align='center'>
                      <StatusWarning color='status-critical' />
                      <Paragraph
                        margin={{ left: 'small' }}
                        size='small'
                        color='status-critical'
                      >
                        You must not be <em>thinking</em> clearly
                      </Paragraph>
                    </Box>
                  )
                  break
                case 'lionsgate':
                  result.message = (
                    <Box direction='row' align='center'>
                      <StatusWarning color='status-critical' />
                      <Paragraph
                        margin={{ left: 'small' }}
                        size='small'
                        color='status-critical'
                      >
                        I ran with the pack for 8 years.
                      </Paragraph>
                    </Box>
                  )
                  break
                default:
                  result.message = (
                    <Box direction='row' align='center'>
                      <StatusWarning color='status-critical' />
                      <Paragraph
                        size='small'
                        margin={{ left: 'small' }}
                        color='status-critical'
                      >
                        You forgot to answer this question, pal.
                      </Paragraph>
                    </Box>
                  )
                  break
              }
              return result
            }}
          >
            <RadioButtonGroup
              id='studio'
              name='studio'
              aria-labelledby='studio'
              value={form.studio}
              onChange={handleChange}
              options={[
                { label: 'Think Film', value: 'think' },
                { label: 'Warner Bros.', value: 'bros' },
                { label: 'Lionsgate', value: 'lionsgate' },
              ]}
            />
          </FormField>
          <FormField
            id='nonprofit'
            name='nonprofit'
            label={
              <Paragraph margin='none'>
                Which of these non-profits was founded by my mother?
              </Paragraph>
            }
            validate={value => {
              const result = {
                message: '',
                status: '',
              }
              switch (value) {
                case 'srf':
                  result.message = (
                    <Box direction='row' align='center'>
                      <StatusGood color='status-ok' />
                      <Paragraph
                        margin={{ left: 'small' }}
                        size='small'
                        color='status-ok'
                      >
                        Yes!{' '}
                        <Anchor
                          target='_blank'
                          href='https://srfcure.org'
                          label='Learn more here'
                        />
                        .
                      </Paragraph>
                    </Box>
                  )
                  result.status = 'info'
                  break
                case 'fake':
                  result.message = (
                    <Box direction='row' align='center'>
                      <StatusWarning color='status-critical' />
                      <Paragraph
                        margin={{ left: 'small' }}
                        size='small'
                        color='status-critical'
                      >
                        You have chosen a fake non-profit. Shame.
                      </Paragraph>
                    </Box>
                  )
                  break
                case 'justice':
                  result.message = (
                    <Box direction='row' align='center'>
                      <StatusWarning color='status-critical' />
                      <Paragraph
                        margin={{ left: 'small' }}
                        size='small'
                        color='status-critical'
                      >
                        Incorrect, but I{' '}
                        <Anchor
                          target='_blank'
                          href='https://www.charitynavigator.org/ein/521744337'
                          label='hear'
                        />{' '}
                        they do great work.
                      </Paragraph>
                    </Box>
                  )
                  break
                default:
                  result.message = (
                    <Box direction='row' align='center'>
                      <StatusWarning color='status-critical' />
                      <Paragraph
                        size='small'
                        margin={{ left: 'small' }}
                        color='status-critical'
                      >
                        You forgot to answer this question, pal.
                      </Paragraph>
                    </Box>
                  )
                  break
              }
              return result
            }}
          >
            <RadioButtonGroup
              id='nonprofit'
              name='nonprofit'
              aria-labelledby='nonprofit'
              value={form.nonprofit}
              onChange={handleChange}
              options={[
                { label: 'Scher Thing Organization', value: 'fake' },
                { label: 'Scleroderma Research Foundation', value: 'srf' },
                { label: 'Institute for Justice', value: 'justice' },
              ]}
            />
          </FormField>
          <Box justify='between' direction='row'>
            {formSubmitted ? (
              <Box id='button-box'>
                <Paragraph color={`status-${score.status}`}>
                  {score.message}
                </Paragraph>
                <Button type='reset' label='Reset' />
              </Box>
            ) : (
              <Button type='submit' label='Submit' fill={false} />
            )}
          </Box>
        </Form>
      </Box>
    </Layer>
  )
}

const CloseButton = styled(Button)`
  position: absolute;
  right: 0.5rem;
  top: 0;
`

export default TwoTruths
