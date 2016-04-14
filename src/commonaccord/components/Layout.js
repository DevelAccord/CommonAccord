import React from 'react'
import Helmet from 'react-helmet'
import { Link, IndexLink } from 'react-router'

const Layout = React.createClass({
  render() {
    return (
      <div>
        <Helmet
          htmlAttributes={{"lang": "en"}}
          title="Getting the world to agreement — CommonAccord"
          titleTemplate="%s — CommonAccord"
          defaultTitle="Getting the world to agreement"
          meta={[
            {name: "description", content: "Getting the world to agreement"},
          ]}
          link={[
            {rel: "icon", type:"image/png", href:"/favicon.png"}
          ]}
        />
        <nav className='navbar navbar-fixed-top navbar-light bg-faded'>
          <div className='container'>
            <IndexLink className='navbar-brand' to='/'>
              <img src="/images/logo.png" alt="Logo" className="logo" />
              CommonAccord
            </IndexLink>
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

        {this.props.children}

        <hr />

        <footer>
          <p>
            This software is provided under the MIT License.<br />
            Documents shown may be subject to another license.
          </p>
        </footer>
      </div>
    );
  }
});

export default Layout;


