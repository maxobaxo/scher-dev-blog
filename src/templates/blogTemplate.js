import * as React from 'react'
import { graphql, navigate } from 'gatsby'
import { Anchor, Heading, Markdown, Page, PageContent, Paragraph } from 'grommet'
import { LinkPrevious } from 'grommet-icons'
import styled from 'styled-components'
import { GatsbyImage, getImage } from 'gatsby-plugin-image'
import Layout from '../components/Layout'
import { formatDate } from '../utils/datetime'
import { defineCustomElements as deckDeckGoElement } from '@deckdeckgo/highlight-code/dist/loader'
deckDeckGoElement()

const Template = ({ data }) => {
  const post = data.markdownRemark
  const {
    rawMarkdownBody,
    frontmatter: { title, date, featuredImage },
  } = post

  const image = getImage(featuredImage)

  return (
    <Layout>
      <Page kind="narrow" pad={{ top: 'large', bottom: 'small' }}>
        <StyledPageContent>
          <Anchor
          icon={<LinkPrevious size='small' />}
          onClick={() => navigate('/blog')}
          label='Back to blog'
          />
          <Heading level={1} margin={{ bottom: 'none' }}>
            {title}
          </Heading>
          <Paragraph size='small' style={{ fontStyle: 'italic' }}>
            {formatDate(date)}
          </Paragraph>
          <FeaturedImage
            image={image}
            alt='generic illustration'
            width='100%'
            height='auto'
          />
          <Markdown
            options={{
              forceBlock: true,
              forceWrapper: true,
              wrapper: 'article',
              overrides: {
                p: {
                  component: StyledParagraph,
                },
              },
            }}
          >
            {rawMarkdownBody}
          </Markdown>
        </StyledPageContent>
          
      </Page>
    </Layout>
  )
}

export default Template

const StyledPageContent = styled(PageContent)`
  blockquote {
    border-left: 2px solid #d9d9d9;
    padding-left: 1rem;
    margin-left: 0;
  }
  @media screen and (min-width: 768px) {
    blockquote {
      margin-left: 1.5rem;
    }
  }
`

const StyledParagraph = styled(Paragraph)`
  max-width: none;
`

const FeaturedImage = styled(GatsbyImage)`
  img {
    border-radius: 0.875rem;
    max-height: 500px;
    max-width: 1100px;
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
              layout: FULL_WIDTH
              height: 169
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
