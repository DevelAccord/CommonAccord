import React from 'react';
import { Link } from 'react-router';
import { connect } from 'react-redux'
import fetch from 'isomorphic-fetch'
import path from 'path'
import { openFolder } from '../actions/folder'
import Modal from 'react-modal'

function formatBytes (b) {
  var i = Math.floor(Math.log(b) / Math.log(1024));
  return !b && '—' || (b / Math.pow(1024, i)).toFixed(0) + " " + ['B', 'KB', 'MB', 'GB', 'TB', 'PB', 'EB', 'ZB', 'YB'][i]
}

const modalStyles = {
  content : {
    top                   : '50%',
    left                  : '50%',
    right                 : 'auto',
    bottom                : 'auto',
    marginRight           : '-50%',
    transform             : 'translate(-50%, -50%)'
  }
};

const FILE_TYPE = 'file'
const FOLDER_TYPE = 'folder'

const Folder = React.createClass({
  getInitialState() {
    // XXX TODO this is a problem for isomorphic rendering.
    return {
      items: [],
      modalType: FILE_TYPE,
      modalIsOpen: false,
      modalFilename: ''
    }
  },

  openModal: function (modalType) {
    this.setState({
      modalIsOpen: true,
      modalType,
    });
  },

  afterOpenModal: function () {
    // references are now sync'd and can be accessed.
    // this.refs.subtitle.style.color = '#f00';
  },

  closeModal: function () {
    this.setState({
      modalIsOpen: false,
      modalFilename: '',
    });
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

  handleCreateFile(event) {
    event.preventDefault()

    if (this.state.modalType === FILE_TYPE) {
      createFile(this.state.modalFilename)
    } else if (this.state.modalType === FOLDER_TYPE) {
      createFolder(this.state.modalFilename)
    }

    this.closeModal()
  },

  handleFilenameChange: function (event) {
    this.setState({ modalFilename: event.target.value });
  },

  render() {
    const { dirname } = this.props;

    return (
      <div className="container">
        <div className="row">
          <div className="col-xs-12">
            <h1>
              <i className="fa fa-book"></i>
              {' '}
              {dirname}
            </h1>
          </div>

          <div className="col-xs-12 table-responsive">

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
                        <Link to={item.link}>
                          <i className={item.icon}/>
                          {' '}
                          <strong>
                            {item.name}
                          </strong>
                        </Link>
                        {' '}
                        &nbsp;
                        {' '}
                        <a href="#" style={{color:'rgba(0, 0, 0, 0.3)', fontSize:'12px'}}>
                          <i className="fa fa-pencil"></i>
                          {' '}
                          rename
                        </a>
                        {' '}
                        <a href="#" style={{color:'rgba(0, 0, 0, 0.3)', fontSize:'12px'}}>
                          <i className="fa fa-trash-o"></i>
                          {' '}
                          delete
                        </a>
                      </td>
                      <td className="text-xs-right" data-sort-value="-1">
                        {item.size ? formatBytes(item.size) : '—'}
                      </td>
                      <td className="text-xs-right" data-sort-value="12345"
                          title='2016-01-28 22:23:06'>
                        1 month ago
                      </td>
                    </tr>
                  );
                })
              }
              </tbody>
            </table>
            <div className="pull-right" style={{marginBottom:'1em'}}>
              <button className="btn btn-primary-outline" onClick={event => this.openModal(FILE_TYPE)}>
                <i className="fa fa-file"></i>
                {' '}
                Create file
              </button>
              {' '}
              <button className="btn btn-primary-outline" onClick={event => this.openModal(FOLDER_TYPE)}>
                <i className="fa fa-folder"></i>
                {' '}
                Create folder
              </button>
            </div>
            <Modal
              isOpen={this.state.modalIsOpen}
              onAfterOpen={this.afterOpenModal}
              onRequestClose={this.closeModal}
              style={modalStyles}
            >
              <h1>New {this.state.modalType}</h1>
              <form className="form-inline" onSubmit={this.handleCreateFile}>
                <div className="form-group">
                  <input type="text" value={this.state.modalFilename}
                         onChange={this.handleFilenameChange} className="form-control" placeholder="name"/>
                </div>
                {' '}
                <div className="form-group">
                  <button type="submit" className="btn btn-primary">
                    Create
                  </button>
                </div>
              </form>
            </Modal>
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
