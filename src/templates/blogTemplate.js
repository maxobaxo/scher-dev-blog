import * as React from 'react'
import { graphql, Link } from 'gatsby'

import Layout from '../components/Layout'

import './blogTemplate.css'

export default function Template({ data }) {
  const post = data.markdownRemark
  const { html, frontmatter: { title, date } } = post;
  return (
    <Layout>
      <Link to='/blog'>Back to blogs</Link>
      <h1>{title}</h1>
      <p>{date}</p>
      {/* <img src={thumbnail} /> */}
      <div dangerouslySetInnerHTML={{ __html: html }} />
    </Layout>
  )
}

export const postQuery = graphql`
  query BlogPost($pagePath: String!) {
    markdownRemark(frontmatter: { path: { eq: $pagePath } }) {
      frontmatter {
        date
        title
        path
      }
      html
    }
  }
`
