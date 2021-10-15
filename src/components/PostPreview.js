import * as React from 'react'
import PropTypes from 'prop-types'
import { navigate } from 'gatsby'
import {
  Anchor,
  Card,
  CardHeader,
  CardBody,
  CardFooter,
  Heading,
  Paragraph,
} from 'grommet'
import { formatDate } from '../utils/datetime'

const PostPreview = ({ title, date, description, path, thumbnail }) => (
  <Card
    height={{ min: 'max-content ' }}
    width={{ min: 'auto', max: '500px' }}
    margin={{ bottom: 'large' }}
  >
    {thumbnail}
    <CardHeader pad='medium'>
      <Heading level={2} margin='none'>
        {title}
      </Heading>
    </CardHeader>
    <CardBody pad={{ left: 'medium', right: 'medium' }}>
      <p>{formatDate(date)}</p>
      <Paragraph>{description}</Paragraph>
    </CardBody>
    <CardFooter pad='medium'>
      <Anchor
        onClick={() => {
          navigate(`/blog/${path}`)
        }}
      >
        Read more
      </Anchor>
    </CardFooter>
  </Card>
)

PostPreview.propTypes = {
  title: PropTypes.string,
  date: PropTypes.string,
  description: PropTypes.string,
  path: PropTypes.string,
}

export default PostPreview
