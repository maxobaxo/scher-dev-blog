import * as React from 'react'
import { Link } from 'gatsby'

import './nav.css'

const Nav = () => (
  <nav className='nav'>
    <ul className='nav-list'>
      <li className='nav-list-item'>
        <Link to='/' activeClassName='nav-active'>
          Home
        </Link>
      </li>
      <li className='nav-list-item'>
        <Link to='/about' activeClassName='nav-active'>
          About
        </Link>
      </li>
      <li className='nav-list-item'>
        <Link to='/blog' activeClassName='nav-active'>
          Blog
        </Link>
      </li>
      <li className='nav-list-item'>
        <Link to='/contact' activeClassName='nav-active'>
          Contact
        </Link>
      </li>
    </ul>
  </nav>
)

export default Nav
