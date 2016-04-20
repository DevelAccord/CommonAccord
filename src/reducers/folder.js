import { REQUEST_FOLDER, UPDATE_FOLDER, SET_CURRENT_FOLDER } from '../actions/folder'

const defaultFolderState = {
  dirname: null,
  content: null,
}

export function folder (state = defaultFolderState, action) {
  switch (action.type) {
    case SET_CURRENT_FOLDER:
      return {
        dirname: action.dirname,
        content: null
      }

    case UPDATE_FOLDER:
      if (action.folder.dirname === state.dirname) {
        return action.folder
      }
  }

  return state
}

export function folderCache (state = {}, action) {
  switch (action.type) {
    case UPDATE_FOLDER:
      return {
        ...state,
        [action.folder.dirname]: action.folder
      }
  }
  return state
}

