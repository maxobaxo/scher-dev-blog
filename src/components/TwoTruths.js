import * as React from 'react'
import {
  Box,
  Button,
  Form,
  FormField,
  Heading,
  Layer,
  Paragraph,
  RadioButtonGroup,
} from 'grommet'
import { Close } from 'grommet-icons'
import styled from 'styled-components'

const TwoTruths = ({ setGameOpen }) => {
  const initialForm = {
    allergies: '',
    studio: '',
  }
  const [form, setForm] = React.useState(initialForm)

  const handleChange = evt => {
    const {
      target: { name, value },
    } = evt
    if (form[name]) {
      return
    }
    const newForm = { ...form }
    newForm[name] = value
    setForm(newForm)
  }

  return (
    <StyledLayer
      animation='fadeIn'
      full={false}
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
      <Box pad='medium'>
        <Heading level={3}>How well do you know me?</Heading>
        <Form onReset={() => setForm(initialForm)} validate='submit'>
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
                  result.message = "I'm all about that bread"
                  result.status = 'info'
                  break
                case 'nuts':
                  result.message =
                    "I'm convinced I'll be taken out by a pistachio"
                  result.status = 'error'
                  break
                case 'dairy':
                  result.message = 'Milk will not do this body good'
                  result.status = 'error'
                  break
                default:
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
                case 'think':
                  result.message = 'You must not be thinking clearly'
                  result.status = 'error'
                  break
                case 'warners':
                  result.message = 'I was never really one of the bros'
                  result.status = 'info'
                  break
                case 'lionsgate':
                  result.message = 'I ran with the pack for 8 years'
                  result.status = 'error'
                  break
                default:
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
                { label: 'Warner Bros.', value: 'warners' },
                { label: 'Lionsgate', value: 'lionsgate' },
              ]}
            />
          </FormField>
          <Box justify='between' direction='row'>
            <Button type='submit' label='Submit' />
            <Button plain type='reset' label='Reset' />
          </Box>
        </Form>
      </Box>
    </StyledLayer>
  )
}

const StyledLayer = styled(Layer)`
  position: relative;
  max-width: 50%;
`

const CloseButton = styled(Button)`
  position: absolute;
  right: 0.5rem;
  top: 0;
`

export default TwoTruths
