export function getApiUrl (filename) {
  return ['/api', filename].filter(x => !!x).join('/')
}

