import path from 'path'
import { SET_CURRENT_FILE } from '../actions/file'
import { SET_CURRENT_FOLDER } from '../actions/folder'

export function breadcrumb (state = [], action) {
  switch (action.type) {
    case SET_CURRENT_FILE:
      return [
        {
          label: '/',
          link: '/docs/'
        },
        ...(action.filename ? action.filename.split('/').map((el, idx, arr) => {
          const postfix = arr.length > idx + 1 ? '/' : ''
          return {
            label: el + postfix,
            link: path.resolve('/docs', ...arr.slice(0, idx + 1)) + postfix
          }
        }) : [])
      ]

    case SET_CURRENT_FOLDER:
      return [
        {
          label: '/',
          link: '/docs/'
        },
        ...(action.dirname ? action.dirname.split('/').filter(x => !!x).map((el, idx, arr) => {
          return {
            label: el + '/',
            link: path.resolve('/docs', ...arr.slice(0, idx + 1)) + '/'
          }
        }) : [])
      ]
  }


  return state
}