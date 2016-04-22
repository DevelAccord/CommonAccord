import { REQUEST_FILE, UPDATE_FILE, SET_CURRENT_FILE } from '../actions/file'

const defaultFileState = {
  filename: null,
  content: null,
}

export function file (state = defaultFileState, action) {
  // Set the currently opened file
  if (SET_CURRENT_FILE === action.type) {
    if (action.filename !== state.filename) {
      // different filename, reset content
      return {
        filename: action.filename,
      }
    }
  }

  // Set content if the update concerns the currently open file
  if (UPDATE_FILE === action.type) {
    if (action.file.filename === state.filename) {
      return {
        ...state,
        filename: action.file.filename,
        content: action.file.content || state.content,
        html: action.file.html || state.html,
      }
    }
  }

  return state
}

export function fileCache (state = {}, action) {
  if (UPDATE_FILE === action.type) {
    return {
      ...state,
      [action.file.filename]: action.file
    }
  }

  return state
}
