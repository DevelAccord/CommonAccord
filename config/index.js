const DEBUG = !!process.env.DEBUG

// TODO simplify and document this.

let config = {
  DEBUG,
  VERBOSE: DEBUG,
  ENV: (DEBUG ? 'development' : 'production'),
  PRODUCTION: !DEBUG,
  DEVELOPMENT: DEBUG,
  'process.env.NODE_ENV': DEBUG ? '"development"' : '"production"',
  __DEV__: DEBUG,
  DOCUMENT_ROOT: process.env.DOCUMENT_ROOT || '/Users/rd/Sites/CommonAccord/Legal',
  PORT: 3000
}

export default config


