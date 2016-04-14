import React from 'react';
import CallToAction from './CallToAction'

const Homepage = React.createClass({
  render() {
    return (
      <div>

        <div className="wrapper first books-background">
          <div className='container'>
            <div className="row">
              <div style={{padding: "140px 0"}} className="col-xs-12 text-xs-center">
                <div className="page-header m-t-1">
                  <h1>Getting the world to agreement</h1>
                </div>
                <p className="lead">
                  CommonAccord is a simple tool to <strong>write</strong>,{' '}
                  <strong>store</strong> and <strong>exchange</strong> legal documents.
                </p>
                <br/>
                <div>
                  <CallToAction className="btn-success" to="/docs">
                    <i className="fa fa-files-o"/> Browse
                  </CallToAction>
                  {' '}
                  <CallToAction className="btn-primary-outline" to="http://commonaccord.readthedocs.org/en/latest/install.html">
                    <i className="fa fa-download"/> Install
                  </CallToAction>
                  {' '}
                  <CallToAction className="btn-primary-outline" to="http://commonaccord.readthedocs.org/">
                    <i className="fa fa-book"/> Documentation
                  </CallToAction>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="wrapper">
          <div className="container">

            <div className="row" style={{marginTop: '2em', marginBottom:'2em'}}>
              <div className="col-xs-7 col-xs-center">
                <h3 style={{margin:'4em 0'}}>Collaboration on legal documents is cumbersome.</h3>
              </div>
              <div className="col-xs-5 col-xs-center">
                <img src="https://marketing.intercomassets.com/assets/_redesign/homepage/hero/old-way-2x-5bb2de5f8750c7b961769a86ab564cc545fda600ca7d591142325bd43acdaa18.png" alt="" className="img-fluid"/>
              </div>
            </div>

            <div className="row" style={{marginTop: '2em', marginBottom:'2em'}}>
              <div className="col-xs-5 col-xs-center">
                <img src="https://marketing.intercomassets.com/assets/_redesign/homepage/hero/new-way-2x-eb131702d499a7ced8e2964f0616fa9f14c461ade49ad4ae5e48dd3c51ac9013.png" alt="" className="img-fluid"/>
              </div>
              <div className="col-xs-7 col-xs-center">
                <h3 style={{margin:'4em 0'}}>Use Commonaccord, no more headaches!</h3>
              </div>
            </div>

          </div>
        </div>

        <div className="wrapper">
          <div className="container">
            <h2>What is CommonAccord?</h2>
            <p>
              <strong>CommonAccord</strong> is a toolkit for legal
              writers and more generally anybody having to use legal
              documents that uses modern state-of-the-art technologies
              to enable a simpler yet highly secure trust model.
            </p>
            <p>
              It allows to write legal documents the same way that
              software developers collaborates on computer code, using
              patches, diffs, and digital signatures to iterate from
              one version to another in the most secure and trustable
              way possible.
            </p>

            <h2>What is the Center for Collaborative Law?</h2>
            <p>
              The <strong>Center for Collaborative Law</strong> will
              be a consortium of common economical interest, that
              aims to produce a trustable legal documents database
              that can be used as a starting point for CommonAccord
              users.
            </p>

            <h2>How can I use it?</h2>
            <p>
              First, you can look around the documents presented on this
              website. You will be able to understand what can be produced using
              CommonAccord.
            </p>

            <ul>
              <li>Jurismatic contracts</li>
              <li>Party example</li>
              <li>Template example</li>
              <li>...</li>
            </ul>

            <p>
              If you want to produce documents, you probably want to
              download the software and run it on your computer.
            </p>

            <h2>How can I contribute?</h2>

            <ul>
              <li>
                <a href="#">Contribute to documents</a>
              </li>
              <li>
                <a href="#">Contribute to the software</a>
              </li>
            </ul>
          </div>
        </div>

      </div>
    );
  }
});

export default Homepage;

