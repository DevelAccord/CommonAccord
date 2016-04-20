import { REQUEST_FILE, UPDATE_FILE, SET_CURRENT_FILE } from '../actions/file'

const defaultFileState = {
  filename: null,
  content: null,
}

export function file (state = defaultFileState, action) {
  // Set the currently opened file
  if (SET_CURRENT_FILE === action.type) {
    return {
      filename: action.filename,
      content: null
    }
  }

  // Set content if the update concerns the currently open file
  if (UPDATE_FILE === action.type) {
    if (action.file.filename === state.filename) {
      return action.file
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
