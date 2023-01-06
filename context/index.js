/* eslint-disable security/detect-non-literal-fs-filename */
/* eslint-disable import/no-dynamic-require */
/* eslint-disable security/detect-non-literal-require */
const fs = require('fs');

const context = process.env.NODE_ENV_CONTEXT || 'default';
const contextPath = `${__dirname}/definitions/${context}.js`;
if (!fs.existsSync(contextPath)) {
  throw new Error(`the context file ${context} not found, please set correctly in the context folder`);
}
const contextConfiguration = require(contextPath);
contextConfiguration.context = context;

module.exports = Object.freeze(contextConfiguration);
