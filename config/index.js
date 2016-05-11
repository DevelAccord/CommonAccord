import os from 'os'
import path from 'path'

const DEBUG = !!process.env.DEBUG
const HOME = os.homedir ? os.homedir() : null

let config = {
  DEBUG,
  VERBOSE: DEBUG,
  ENV: (DEBUG ? 'development' : 'production'),
  PRODUCTION: !DEBUG,
  DEVELOPMENT: DEBUG,
  'process.env.NODE_ENV': DEBUG ? '"development"' : '"production"',
  __DEV__: DEBUG,
  DOCUMENT_ROOT: process.env.DOCUMENT_ROOT,
  CMACC_PARSER: process.env.CMACC_PARSER,
  PORT: 3000
}

export default config


