import React from 'react'
import Helmet from 'react-helmet'
import { Link, IndexLink } from 'react-router'
import { connect } from 'react-redux'

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
            {charset: "utf-8"},
            {name: "viewport",  content:"width=device-width, initial-scale=1, shrink-to-fit=no"},
            {name: "description", content: "Getting the world to agreement"}
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
              {
                this.props.breadcrumb.map((item) => {
                  return (
                    <li className="nav-item">
                      <Link className='nav-link' to={item.link} activeClassName='active'>
                        {item.label}
                      </Link>
                    </li>
                  )
                })
              }
            </ul>
          </div>
        </nav>

        {this.props.children}

        <div className="wrapper last">
          <footer className="container">
            <div className="row">
              <p className="col-xs-12">
                This software is provided under the MIT License.<br />
                Documents shown may be subject to another license.
              </p>
            </div>
          </footer>
        </div>
      </div>
    );
  }
});


const mapStateToProps = ({ breadcrumb }) => {
  return {
    breadcrumb
  }
}

export default connect(mapStateToProps)(Layout);


