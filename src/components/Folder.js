import React from 'react';
import { Link } from 'react-router';
import { connect } from 'react-redux'
import fetch from 'isomorphic-fetch'
import path from 'path'
import { openFolder } from '../actions/folder'

function formatBytes (b) {
  var i = Math.floor(Math.log(b) / Math.log(1024));
  return !b && '—' || (b / Math.pow(1024, i)).toFixed(0) + " " + ['B', 'KB', 'MB', 'GB', 'TB', 'PB', 'EB', 'ZB', 'YB'][i]
}

const Folder = React.createClass({
  getInitialState() {
    // XXX TODO this is a problem for isomorphic rendering.
    return { items: [] }
  },

  componentWillMount() {
    this.props.dispatch(openFolder(this.props.dirname))

    this.setState({
      items: this.props.items
    })
  },

  componentWillReceiveProps(nextProps) {
    if (nextProps.dirname !== this.props.dirname) {
      this.props.dispatch(openFolder(nextProps.dirname))
    }

    this.setState({
      items: nextProps.items
    })
  },


  render() {
    const { dirname } = this.props;

    return (
      <div className="container">
        <div className="row">
          <div className="col-xs-12 table-responsive">
            <h1>Directory: {dirname}</h1>
            <table id="listr-table" className="table table-hover table-sm">
              <thead>
              <tr>
                <th className="text-xs-left" data-sort="string">
                  Name
                </th>
                <th className="text-xs-right" data-sort="int">
                  Size
                </th>
                <th className="text-xs-right" data-sort="int">
                  Modified
                </th>
              </tr>
              </thead>
              <tbody>
              {
                (this.state.items || []).map((item) => {
                  return (
                    <tr key={item.name}>
                      <td className="text-xs-left" data-sort-value="dir-checksum">
                        <i className={item.icon}/>
                        <Link to={item.link}>
                          <strong>
                            {item.name}
                          </strong>
                        </Link>
                      </td>
                      <td className="text-xs-right" data-sort-value="-1">
                        {item.size ? formatBytes(item.size) : '—'}
                      </td>
                      <td className="text-xs-right" data-sort-value="12345" title='2016-01-28 22:23:06'>
                        1 month ago
                      </td>
                    </tr>
                  );
                })
              }
              </tbody>
            </table>
          </div>
        </div>
      </div>
    );
  }
});

function mapStateToProps (state, ownProps) {
  const dirname = ownProps.params.splat || '/'

  if (dirname === state.folder.dirname) {
    return state.folder
  } else {
    return {
      dirname
    }
  }
}

export default connect(mapStateToProps)(Folder)
