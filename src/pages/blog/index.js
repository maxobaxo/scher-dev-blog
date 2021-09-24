import * as React from 'react'
import { graphql } from 'gatsby'

import Layout from '../../components/Layout'
import Post from '../../components/Post'

const Blog = ({ data }) => (
  <Layout>
    <h1>Blog</h1>
    {data?.allMarkdownRemark?.edges?.map(post => {
      const { title, author, date, description, path } = post.node.frontmatter
      console.log('path::', path)
      return (
        <Post
          title={title}
          date={date}
          description={description}
          key={`${date}__${title}`}
          path={path}
        />
      )
    })}
  </Layout>
)

export default Blog

export const AllBlogsQuery = graphql`
  query AllBlogPosts {
    allMarkdownRemark {
      edges {
        node {
          id
          frontmatter {
            date
            title
            path
          }
        }
      }
    }
  }
`