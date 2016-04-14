import React from 'react'
import { Link, IndexLink } from 'react-router'

export default function Layout ({ children }) {
  return (
    <div>
      <nav className='navbar navbar-fixed-top navbar-light bg-faded'>
        <div className='container'>
          <IndexLink className='navbar-brand' to='/'>CommonAccord</IndexLink>
          <ul className='nav navbar-nav'>
            <li className='nav-item'>
              <IndexLink className='nav-link' to='/' activeClassName='active'>
                Index
              </IndexLink>
            </li>
            <li className='nav-item'>
              <Link className='nav-link' to='/about' activeClassName='active'>
                About
              </Link>
            </li>
          </ul>
        </div>
      </nav>

      <div className='container'>
        <div className='row'>
          {children}
        </div>
      </div>

      <hr />

      <footer>
        <p>
          This software is provided under the MIT License.<br />
          Documents shown may be subject to another license.
        </p>
      </footer>
    </div>
  )
}
