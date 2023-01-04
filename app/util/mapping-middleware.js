const isString = require('lodash/isString');
const includes = require('lodash/includes');
const split = require('lodash/split');
const camelCase = require('lodash/camelCase');
const appRoot = require('app-root-path');
const fs = require('fs');
const pathlib = require('path');

const DEFAULT_MIDDLEWARE_PATH = process.env.DEFAULT_MIDDLEWARE_PATH || `${appRoot}/app/middlewares/`;
const DEFAULT_MIDDLEWARE_EXTENSION = process.env.DEFAULT_MIDDLEWARE_EXTENSION || '.js';
const SLASH = '/';

function getInfoMiddleware(value, localMiddlewarePath) {
    let parts = [];
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

function getMiddlewares (middlewareNames, localPath = DEFAULT_MIDDLEWARE_PATH) {
    const arrayOfMiddlewares = [];

    try {
        if(isString(middlewareNames)) {
            middlewareNames = JSON.parse(middlewareNames);
        }
        middlewareNames.forEach((name) => {
            const info = getInfoMiddleware(name, localPath);
            switch(info.type) {
                default: {
                    const mdwPath = searchRecursive(localPath, name);
                    const middleware = require(mdwPath)[info.middleware];
                    arrayOfMiddlewares.push(middleware);
                    break;
                }
            }
        });
        return arrayOfMiddlewares;
    } catch (error) {
        throw error;
    }
}

module.exports = { getMiddlewares };