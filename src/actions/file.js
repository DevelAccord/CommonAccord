import fetch from 'isomorphic-fetch'
import { notify } from './notifications'
import { getApiUrl } from './utils'
import config from '../../config'

export const REQUEST_FILE = 'REQUEST_FILE'
export const UPDATE_FILE = 'UPDATE_FILE'
//export const INVALIDATE_FILE = 'INVALIDATE_FILE'
export const SET_CURRENT_FILE = 'SET_CURRENT_FILE'
export const FILE_SAVED = 'FILE_SAVED'


function setCurrentFile (filename) {
  return {
    type: SET_CURRENT_FILE,
    filename
  }
}

function updateFile (filename, content) {
  return {
    type: UPDATE_FILE,
    file: {
      filename,
      content
    }
  }
}

/**
 * Open file.
 *
 * @param filename
 * @returns {Function}
 */
export function openFile (filename) {
  return (dispatch, getState) => {
    const { file, fileCache } = getState()

    if (file.filename !== filename) {
      dispatch(setCurrentFile(filename))
    }

    if (fileCache[filename]) {
      dispatch(updateFile(filename, fileCache[filename].content))
    } else {
      _getFile(filename, (text) => {
        dispatch(updateFile(filename, text))
      })
    }
  }
}

/**
 * Save file.
 *
 * @param filename
 * @param content
 * @returns {Function}
 */
export function saveFile (filename, content) {
  return (dispatch, getState) => {
    const { file } = getState()

    _postFile(filename, content, (response) => {
      dispatch({
        type: FILE_SAVED,
        status: response.status
      })
      dispatch(notify('File saved.'))
    })
  }
}

function _getFile (filename, callback) {
  return fetch(getApiUrl(filename))
    .then((response) => response.text())
    .then(callback)
}

function _postFile (filename, content, callback) {
  fetch(getApiUrl(filename), {
    method: 'POST',
    body: content
  }).then(callback)
}

