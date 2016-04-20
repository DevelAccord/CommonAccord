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

    fetch(['/api', this.props.dirname].filter(x => !!x).join('/'))
      .then(
        (response) => response.json()
      )
      .then(
        (json) => {
          let items = this.props.dirname ? [{
            name: '..',
            icon: 'fa fa-fw fa-reply',
            link: path.resolve('/docs/', this.props.dirname, '..') + '/'
          }] : []
          for (var x in json) {
            if (json.hasOwnProperty(x)) {
              items.push({
                name: x,
                icon: json[x].isDirectory ? 'fa fa-fw fa-folder' : json[x].isFile ? 'fa fa-fw fa-file' : 'fa fa-fw fa-question',
                link: path.resolve('/docs', this.props.dirname || '.', x) + (json[x].isDirectory ? '/' : ''),
                size: json[x].isDirectory ? null : json[x].size
              })
            }
          }
          this.setState({ items })
        }
      )
  },

  componentWillReceiveProps(nextProps) {
    this.props.dispatch(openFolder(nextProps.dirname))

    fetch(['/api', nextProps.dirname].filter(x => !!x).join('/'))
      .then(
        (response) => response.json()
      )
      .then(
        (json) => {
          let items = nextProps.dirname ? [{
            name: '..',
            icon: 'fa fa-fw fa-reply',
            link: path.resolve('/docs/', nextProps.dirname, '..') + '/'
          }] : []
          for (var x in json) {
            if (json.hasOwnProperty(x)) {
              items.push({
                name: x,
                icon: json[x].isDirectory ? 'fa fa-fw fa-folder' : json[x].isFile ? 'fa fa-fw fa-file' : 'fa fa-fw fa-question',
                link: path.resolve('/docs', nextProps.dirname || '.', x) + (json[x].isDirectory ? '/' : ''),
                size: json[x].isDirectory ? null : json[x].size
              })
            }
          }
          this.setState({ items })
        }
      )

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
                this.state.items.map((item) => {
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
  const dirname = ownProps.params.splat

  if (dirname == state.folder.dirname) {
    return state.folder
  } else {
    return {
      dirname
    }
  }
}

export default connect(mapStateToProps)(Folder)
