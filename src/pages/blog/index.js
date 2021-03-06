import * as React from 'react'
import { graphql } from 'gatsby'
import { Box } from 'grommet'
import { GatsbyImage, getImage } from 'gatsby-plugin-image'
import Layout from '../../components/Layout'
import PostPreview from '../../components/PostPreview'
import Seo from '../../components/Seo'

const Blog = ({ data, location }) => (
  <Layout location={location}>
    <Seo title='Max Scher | Blog' description='All blog posts' />
    <Box
      flex
      wrap
      direction='row'
      pad={{ top: 'large', bottom: 'medium', right: 'small', left: 'small' }}
      justify={data?.allMarkdownRemark?.edges.length < 3 ? 'center' : 'around'}
    >
      {data?.allMarkdownRemark?.edges?.map(post => {
        const {
          title,
          date,
          description,
          path,
          featuredImage,
        } = post.node.frontmatter
        const image = getImage(featuredImage)

        return (
          <PostPreview
            title={title}
            date={date}
            description={description}
            thumbnail={<GatsbyImage image={image} alt='generic illustration' />}
            key={`${date}__${title}`}
            path={path}
          />
        )
      })}
    </Box>
  </Layout>
)

export default Blog

export const AllBlogsQuery = graphql`
  query AllBlogPosts {
    allMarkdownRemark(sort: { fields: frontmatter___date, order: DESC }) {
      edges {
        node {
          id
          frontmatter {
            date
            title
            path
            description
            featuredImage {
              childImageSharp {
                gatsbyImageData(
                  height: 169,
                  layout: CONSTRAINED
                )
              }
            }
          }
        }
      }
    }
  }
`
