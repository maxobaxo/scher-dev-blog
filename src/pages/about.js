import * as React from 'react'
import Layout from '../components/Layout'

const About = () => (
  <Layout>
    <h1>About</h1>
    <p>
      Hi, I'm Max. I'm currently a full stack software engineer at Nike, where I
      work in JavaScript and React.
    </p>
    <blockquote>
      “Just because I choose not to drink doesn’t automatically make me no fun.
      That is a separate choice, which I have also made.”{' '}
      <a href='https://twitter.com/trisarahjtops'>-@trisarahjtops</a>
    </blockquote>
    <p>Some things about me:</p>
    <ul>
      <li>I'm a Dad and a Husband</li>
      <li>
        I'm allergic to a lot of foods: dairy, all nuts, poppy seeds, hemp.
      </li>
      <li>I used to work in the motion picture business.</li>
    </ul>
  </Layout>
)

export default About
