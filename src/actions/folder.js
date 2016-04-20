import path from 'path'
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

function updateFolder (dirname, items) {
  return {
    type: UPDATE_FOLDER,
    folder: {
      dirname,
      items
    }
  }
}

export function openFolder (dirname) {
  return (dispatch, getState) => {
    const { folder, folderCache } = getState()

    if (folder.dirname !== dirname) {
      dispatch(setCurrentFolder(dirname))
    }

    if (folderCache[dirname]) {
      dispatch(updateFolder(dirname, folderCache[dirname].items))
    } else {
      _getFolder(dirname, (items) => {
        dispatch(updateFolder(dirname, items))
      })
    }
  }
}

function _getFolder (dirname, callback) {
  dirname = (dirname || '').startsWith('/') ? dirname.slice(1) : dirname

  return fetch(getApiUrl(dirname))
    .then(
      (response) => response.json()
    )
    .then(
      (json) => {
        let items = dirname ? [{
          name: '..',
          icon: 'fa fa-fw fa-reply',
          link: path.resolve('/docs/', dirname, '..') + '/'
        }] : []
        for (var x in json) {
          if (json.hasOwnProperty(x)) {
            items.push({
              name: x,
              icon: json[x].isDirectory ? 'fa fa-fw fa-folder' : json[x].isFile ? 'fa fa-fw fa-file' : 'fa fa-fw fa-question',
              link: path.resolve('/docs', dirname || '.', x) + (json[x].isDirectory ? '/' : ''),
              size: json[x].isDirectory ? null : json[x].size
            })
          }
        }

        return items
      }
    )
    .then(callback)
}
