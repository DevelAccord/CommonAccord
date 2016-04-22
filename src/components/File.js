import React from 'react'
import { connect } from 'react-redux'
import { Editor, EditorState, ContentState, KeyBindingUtil, getDefaultKeyBinding } from 'draft-js';
import { openFile, saveFile } from '../actions/file'
import { notify } from '../actions/notifications'

const { hasCommandModifier } = KeyBindingUtil;

function commonAccordEditorKeyBindingFn (e) {
  if (e.keyCode === 83 /* `S` key */ && hasCommandModifier(e)) {
    return 'ca-save';
  }
  return getDefaultKeyBinding(e);
}

class CommonAccordEditor extends React.Component {
  constructor () {
    super()
    this.onChange = (editorState) => this.setState({ editorState });
  }

  handleKeyCommand (command) {
    if (command === 'ca-save') {
      this.handleSave()
      return true;
    }
    return false;
  }

  handleSave () {
    this.props.dispatch(
      saveFile(this.props.filename, this.state.editorState.getCurrentContent().getPlainText())
    )
  }

  componentWillMount () {
    this.props.dispatch(openFile(this.props.filename))
    this.setState({
      editorState: this.props.content ? EditorState.createWithContent(
        ContentState.createFromText(this.props.content)
      ) : EditorState.createEmpty()
    })
  }

  componentWillReceiveProps (nextProps) {
    if (nextProps.filename !== this.props.filename) {
      this.props.dispatch(openFile(nextProps.filename))
    }
    this.setState({
      editorState: nextProps.content ? EditorState.createWithContent(
        ContentState.createFromText(nextProps.content)
      ) : EditorState.createEmpty()
    })
  }

  render () {
    const {editorState} = this.state;
    return (
      <div className="editor">
        <Editor
          editorState={editorState}
          onChange={this.onChange}
          handleKeyCommand={this.handleKeyCommand.bind(this)}
          keyBindingFn={commonAccordEditorKeyBindingFn}
        />
        <div className="pull-right" style={{marginBottom:'1em'}}>
          <button className="btn btn-primary" onClick={this.handleSave.bind(this)}>Save</button>
        </div>
      </div>
    );
  }
}

class File extends React.Component {
  render () {
    return (
      <div className="container">
        <div className="row">

          <div className="col-xs-12">
            <h1>
              <i className="fa fa-book"></i>
              {' '}
              {this.props.filename}
            </h1>
          </div>

          <div className="col-xs-12 table-responsive">
            <ul className="nav nav-tabs" role="tablist">
              <li className="nav-item">
                <a className="nav-link" data-toggle="tab" href="#view" role="tab">View</a>
              </li>
              <li className="nav-item">
                <a className="nav-link" data-toggle="tab" href="#navigate" role="tab">Navigate</a>
              </li>
              <li className="nav-item">
                <a className="nav-link active" data-toggle="tab" href="#edit" role="tab">Edit</a>
              </li>
            </ul>

            <div className="tab-content">
              <div className="tab-pane" id="view" role="tabpanel">
                <div className="viewer">
                  {this.props.html}
                </div>
              </div>
              <div className="tab-pane" id="navigate" role="tabpanel">
                <div className="navigator">
                  Navigate (not implemented yet).
                </div>
              </div>
              <div className="tab-pane active" id="edit" role="tabpanel">
                <CommonAccordEditor {...this.props} />
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  }
}

function mapStateToProps (state, ownProps) {
  const filename = ownProps.params.splat

  if (filename == state.file.filename) {
    return state.file
  } else {
    return {
      filename
    }
  }
}

export default connect(mapStateToProps)(File)

