/* eslint-disable security/detect-non-literal-fs-filename */
/* eslint-disable import/no-dynamic-require */
/* eslint-disable global-require */
/* eslint-disable security/detect-non-literal-require */
/* eslint-disable no-param-reassign */
const isString = require('lodash/isString');
const camelCase = require('lodash/camelCase');
const appRoot = require('app-root-path');
const fs = require('fs');
const pathlib = require('path');

const DEFAULT_MIDDLEWARE_PATH = process.env.DEFAULT_MIDDLEWARE_PATH || `${appRoot}/app/middlewares/`;
const DEFAULT_MIDDLEWARE_EXTENSION = process.env.DEFAULT_MIDDLEWARE_EXTENSION || '.js';
const SLASH = '/';

function getInfoMiddleware(value, localMiddlewarePath) {
  const response = {};
  response.type = 'default';
  response.path = `${localMiddlewarePath}${value}`;
  response.middleware = camelCase(value);

  return response;
}

const searchRecursive = (dir, pattern) => {
  let result = '';

  fs.readdirSync(dir).forEach((innerDir) => {
    const dirMdw = pathlib.resolve(dir, innerDir);
    const stat = fs.statSync(dirMdw);

    if (stat.isDirectory()) {
      result = result.concat(searchRecursive(dirMdw, pattern));
    }
    if (stat.isFile() && dirMdw.endsWith(`${SLASH}${pattern}${DEFAULT_MIDDLEWARE_EXTENSION}`)) {
      result = dirMdw;
    }
  });
  return result;
};

function getMiddlewares(middlewareNames, localPath = DEFAULT_MIDDLEWARE_PATH) {
  const arrayOfMiddlewares = [];
  if (isString(middlewareNames)) {
    middlewareNames = JSON.parse(middlewareNames);
  }
  middlewareNames.forEach((name) => {
    const info = getInfoMiddleware(name, localPath);
    switch (info.type) {
      default: {
        const mdwPath = searchRecursive(localPath, name);
        const middleware = require(mdwPath)[info.middleware];
        arrayOfMiddlewares.push(middleware);
        break;
      }
    }
  });
  return arrayOfMiddlewares;
}

module.exports = { getMiddlewares };
