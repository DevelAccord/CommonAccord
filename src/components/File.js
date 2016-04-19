import React from 'react'
import { connect } from 'react-redux'
import { Editor, EditorState, ContentState, KeyBindingUtil, getDefaultKeyBinding } from 'draft-js';
import { openFile, saveFile } from '../actions/file'

const { hasCommandModifier } = KeyBindingUtil;

function commonAccordEditorKeyBindingFn(e) {
  if (e.keyCode === 83 /* `S` key */ && hasCommandModifier(e)) {
    return 'ca-save';
  }
  return getDefaultKeyBinding(e);
}

class CommonAccordEditor extends React.Component {
  constructor() {
    super()
    this.onChange = (editorState) => this.setState({editorState});
  }

  handleKeyCommand(command) {
    if (command === 'ca-save') {
      // Perform a request to save your contents, set a new `editorState`, etc.
      this.props.dispatch(saveFile(this.props.filename, this.state.editorState.getCurrentContent().getPlainText()))
      return true;
    }
    return false;
  }

  componentWillMount() {
    console.log('cwm')
    if (!this.props.content) {
      this.props.dispatch(openFile(this.props.filename))
    }

    this.setState({
      editorState: this.props.content ? EditorState.createWithContent(
        ContentState.createFromText(this.props.content)
      ) : EditorState.createEmpty()
    })
  }

  componentWillReceiveProps(nextProps) {
    this.setState({
      editorState: nextProps.content ? EditorState.createWithContent(
        ContentState.createFromText(nextProps.content)
      ) : EditorState.createEmpty()
    })
  }

  render() {
    const {editorState} = this.state;
    return <Editor
      editorState={editorState}
      onChange={this.onChange}
      handleKeyCommand={this.handleKeyCommand.bind(this)}
      keyBindingFn={commonAccordEditorKeyBindingFn}
    />;
  }
}

class File extends React.Component {
  render () {
    return (
      <div className="container">
        <div className="row">
          <div className="col-xs-12 table-responsive">
            <h1>File: {this.props.filename}</h1>
            <div className="editor">
              <CommonAccordEditor {...this.props} />
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

