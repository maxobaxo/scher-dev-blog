import * as React from 'react'
import { graphql } from 'gatsby'
import { Box } from 'grommet'
import { GatsbyImage, getImage } from 'gatsby-plugin-image'
import Layout from '../../components/Layout'
import PostPreview from '../../components/PostPreview'

const Blog = ({ data, location }) => (
  <Layout location={location}>
    <Box
      flex
      wrap
      direction='row'
      pad='medium'
      gap='medium'
      justify={data?.allMarkdownRemark?.edges.length < 3 ? 'center' : 'around'}
      height={{ min: 'max-content' }}
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
                gatsbyImageData(width: 300)
              }
            }
          }
        }
      }
    }
  }
`
