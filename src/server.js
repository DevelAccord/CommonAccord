/**
 * This is the «server» entry point.
 *
 * It will be used to render the server side, SEO-friendly, version of the site.
 */

import bodyParser from 'body-parser'
import Express from 'express'
import path from 'path'
import React from 'react'
import process from 'child_process'
import ReactDOMServer from 'react-dom/server'
import { Provider } from 'react-redux'
import { match, RouterContext, createMemoryHistory } from 'react-router'
import { syncHistoryWithStore } from 'react-router-redux'
import Helmet from 'react-helmet'
import morgan from 'morgan'
import reduce from 'lodash.reduce'
import zip from 'lodash.zip'
import map from 'lodash.map'
import config from '../config'
import routes from './routes'
import configureStore from './store'

function renderElementWithState (store, element) {
  const innerHtml = ReactDOMServer.renderToString(element)
  const head = Helmet.rewind()

  const assets = require('../build/assets')
  const mainJs = assets.main.js
  const mainCss = assets.main.css
    ? `<link href="${assets.main.css}" media="all" rel="stylesheet" />` : ''

  return `<!doctype html>
<html ${head.htmlAttributes.toString()}>
  <head>
    ${head.title.toString()}
    ${head.meta.toString()}
    ${head.link.toString()}
    ${mainCss}
  </head>
  <body>
    <div id="root">${innerHtml}</div>
    <script>window.__INITIAL_STATE__  = ${JSON.stringify(store.getState())};</script>
    <script src="${mainJs}"></script>
  </body>
</html>`
}

/**
 * Create HTML from router props.
 */
function render (store, renderProps) {
  return renderElementWithState(store, (
      <Provider store={store}>
        <RouterContext {...renderProps} />
      </Provider>
    )
  )
}

/**
 * Configure server
 */
function createHandler (enhancer) {
  let handler = new Express()

  handler.use(morgan('combined'))
  // Add production middlewares
  if (!config.DEBUG) {
    handler.use(require('compression')())
  }

  // Static files middleware
  handler.use(Express.static(path.join(__dirname, './public/')))

  if (enhancer) {
    handler = enhancer(handler)
  }

  // Main handler
  handler.get('*', (req, res) => {
    const memoryHistory = createMemoryHistory(req.url)
    const store = configureStore(memoryHistory)
    const history = syncHistoryWithStore(memoryHistory, store)

    match({ history, routes, location: req.url }, (error, redirectLocation, renderProps) => {
      if (error) {
        res.status(500).send(error.message)
      } else if (redirectLocation) {
        res.redirect(302, redirectLocation.pathname + redirectLocation.search)
      } else if (renderProps) {
        res.send(render(store, renderProps))
      } else {
        res.status(404).send('Not Found')
      }
    })
  })

  return handler
}


function statsToJson (stats) {
  const { atime, mtime, ctime, size } = stats
  return {
    atime,
    mtime,
    ctime,
    size,
    isDirectory: stats.isDirectory(),
    isFile: stats.isFile()
  }
}

/**
 * Run the parser. As fast and as dirty as the previous PHP version, please feel free to make this async.
 *
 * @param docPath
 * @returns {*}
 */
function parse(docPath) {
  return process.execSync('(cd ' + config.CMACC_PARSER + '; perl parser-print.pl ' + config.DOCUMENT_ROOT + '/' + docPath + ')');
}

function fsApi(docRoot) {
  const fs = require('fs')
  const async = require('async')

  return function (req, res) {
    const url = req.path.startsWith('/') ? req.path.slice(1) : req.path
    const filename = path.resolve(docRoot, url)
    let filestat
    try {
      filestat = fs.lstatSync(filename)
    }
    catch (e) {
      return res.status(404).send('Not found.');
    }

    if (filestat.isDirectory()) {
      fs.readdir(filename, (err, files) => {
        async.map(
          map(files, (file) => path.resolve(docRoot, url, file)),
          fs.stat,
          (err, stats) => {
            // send a json response
            res.json(
              reduce(zip(files, stats), (ret, file) => {
                ret[file[0]] = statsToJson(file[1])
                return ret
              }, {})
            )
          }
        )
      })

      return
    }

    if (filestat.isFile()) {
      switch (req.method) {
        case 'GET':
          switch (req.query.format) {
            case 'html':
              res.set('Content-Type', 'text/html');
              return res.send(parse(url))
            default:
              return res.sendFile(filename)
          }

        case 'PUT':
          return fs.writeFile(filename, req.body, (err) => {
            if (err) {
              res.status = 500
              res.send(`error: ${err}`)
            } else {
              res.send('ok')
            }
          })
      }
    }

    throw new Error('Unhandled.')
  }
}

const defaultHandler = createHandler((handler) => {
  console.log(config.DOCUMENT_ROOT);
  handler.use('/api', bodyParser.text(), fsApi(config.DOCUMENT_ROOT))
  return handler;
})

/**
 * Serve that shit.
 *
 * WARNING: Don't change the server message output to the console, as it is
 * for now used in a regexp to detect server reload. This is an heritage from
 * react-starter-kit, I guess they had a good reason to use this hack even if
 * I'd like to remove it.
 */
if (require.main === module) {
  require('http').createServer(defaultHandler).listen(config.PORT, () => {
    console.log(`[http] Server listening to :${config.PORT}`)  // eslint-disable-line no-console
  })
}

export default defaultHandler

