import * as React from 'react'
import { graphql, navigate } from 'gatsby'
import { Anchor, Box, Heading, Markdown, Paragraph } from 'grommet'
import { LinkPrevious } from 'grommet-icons'
import styled from 'styled-components'
import { GatsbyImage, getImage } from 'gatsby-plugin-image'
import Layout from '../components/Layout'
import { formatDate } from '../utils/datetime'

const Template = ({ data }) => {
  const post = data.markdownRemark
  const {
    rawMarkdownBody,
    frontmatter: { title, date, featuredImage },
  } = post

  const image = getImage(featuredImage)

  return (
    <Layout>
      <Box pad='medium' height={{ min: 'max-content' }}>
        <Anchor
          icon={<LinkPrevious size='small' />}
          onClick={() => navigate('/blog')}
          label='Back to blog'
        />
        <Heading level={1} margin={{ bottom: 'none' }}>
          {title}
        </Heading>
        <Paragraph fill size='small'>
          {formatDate(date)}
        </Paragraph>
        <GatsbyImage
          image={image}
          alt='generic illustration'
          width='100%'
          height='auto'
        />
        <StyledBox align='center' height={{ min: 'max-content' }}>
          <Markdown
            options={{
              forceBlock: true,
              forceWrapper: true,
              wrapper: 'article',
              overrides: {
                p: {
                  component: Paragraph,
                },
              },
            }}
          >
            {rawMarkdownBody}
          </Markdown>
        </StyledBox>
      </Box>
    </Layout>
  )
}

export default Template

const StyledBox = styled(Box)`
  & > div,
  & > div p {
    width: 100%;
    max-width: unset;
  }
`

export const postQuery = graphql`
  query BlogPost($pagePath: String!) {
    markdownRemark(frontmatter: { path: { eq: $pagePath } }) {
      frontmatter {
        date
        title
        featuredImage {
          childImageSharp {
            gatsbyImageData(
              placeholder: BLURRED
              formats: AUTO
              layout: CONSTRAINED
            )
          }
        }
        path
      }
      html
      rawMarkdownBody
    }
  }
`
