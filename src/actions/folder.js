import fetch from 'isomorphic-fetch'
import { getApiUrl } from './utils'
import config from '../../config'

export const REQUEST_FOLDER = 'REQUEST_FOLDER'
export const UPDATE_FOLDER = 'UPDATE_FOLDER'
//export const INVALIDATE_FOLDER = 'INVALIDATE_FOLDER'
export const SET_CURRENT_FOLDER = 'SET_CURRENT_FOLDER'


function setCurrentFolder (dirname) {
  return {
    type: SET_CURRENT_FOLDER,
    dirname
  }
}

export function openFolder (dirname) {
  return (dispatch, getState) => {
    const { folder, folderCache } = getState()

    if (folder.dirname !== dirname) {
      dispatch(setCurrentFolder(dirname))
    }

    /*
    if (fileCache[filename]) {
      dispatch(updateFile(filename, fileCache[filename]))
    } else {
      getFile(filename, (text) => {
        dispatch(updateFile(filename, text))
      })
    }
    */
  }
}