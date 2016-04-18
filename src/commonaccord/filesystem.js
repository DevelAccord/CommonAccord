import trim from 'lodash/trim';
import filter from 'lodash/filter';
import path from 'path';
import fs from 'fs';
import process from 'child_process';

/**
 * This should come from config, probably with a default and an option to fetch it from environment
 *
 * @type {string}
 */
const DOCUMENT_ROOT = '/Users/rd/Sites/CommonAccord/Legal';

/**
 * Make a path from user input.
 *
 * @param rawPath
 * @returns {string|*}
 */
function normalizePath(rawPath) {
  return path.join('/', trim(rawPath, '/'));
}

/**
 * Parse a document path and returns a list of objects used in header breadcrumb.
 *
 * @param docPath
 * @returns {*[]}
 */
export function getBreadcrumb(docPath) {
  let currentBreadcrumbLink = '/docs';
  return [{
    name: 'Documents',
    link: '/docs/',
  }, ...filter(trim(docPath, '/').split('/')).map(item => {
    currentBreadcrumbLink = path.join(currentBreadcrumbLink, item);
    return {
      name: item,
      link: currentBreadcrumbLink,
    }
  })];
}

/**
 * Read a directory and return a list of objects that the file browser can use.
 *
 * @param docPath
 * @param fullPath
 * @returns {*}
 */
function getDirectoryItems(docPath, fullPath) {
  return fs.readdirSync(fullPath).map(item => {
    let _stat = fs.lstatSync(path.join(fullPath, item));
    return {
      name: item,
      type: _stat.isDirectory() ? 'dir' : 'file',
      class: _stat.isDirectory() ? 'fa-folder' : 'fa-file-text',
      link: path.join('/docs', docPath, item),
    };
  })
}

/**
 * Run the parser. As fast and as dirty as the previous PHP version, please feel free to make this async.
 *
 * @param docPath
 * @returns {*}
 */
function parse(docPath) {
  return process.execSync('(cd /Users/rd/Sites/CommonAccord/Parser; perl parser-print.pl Doc/' + docPath + ')');
}


/**
 * Documents route.
 *
 * This route is responsible for the filesystem browser and the file editor. Long to render subparts may be loaded
 * asynchronously using AJA*, but that's yet to be decided as it makes it non-indexable.
router.get('/docs/*', function (req, res, next) {
  let docPath = normalizePath(req.params[0]);
  let fullPath = path.join(DOCUMENT_ROOT, docPath);
  let docStat = fs.lstatSync(fullPath);
  let breadcrumb = getBreadcrumb(docPath);

  if (docStat.isDirectory()) {
    // Showing a directory ...
    res.render('folder', {
      breadcrumb,
      docPath,
      items: getDirectoryItems(docPath, fullPath)
    });
  } else if (docStat.isFile()) {
    // Showing a file ...
    let action = req.query.action;

    res.render('file', {
      breadcrumb,
      docPath,
      action,
      renderedContent: parse(docPath),
      content: fs.readFileSync(fullPath),
    });
  } else {
    // Showing an alien ...
    throw new Error('nope.');
  }
});
 @p

 */
