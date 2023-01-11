/* eslint-disable security/detect-non-literal-require */
/* eslint-disable import/no-dynamic-require */
const country = process.env.NODE_CONTEXT_COUNTRY ? (process.env.NODE_CONTEXT_COUNTRY).toLowerCase() : 'cl';

const middlewares = require(`./${country}-default-middleware`);

module.exports = {
  name: process.env.NODE_CONTEXT_NAME || 'api-services-base',
  port: process.env.NODE_CONTEXT_PORT || 3000,
  mongoConnection: {
    mongoUri: process.env.MONGO_DB_URI || '',
    mongoUser: process.env.MONGO_DB_USER || '',
    mongoPassword: process.env.MONGO_DB_PASSWORD || '',
  },
  middlewares,
  country,
  version: process.env.NODE_CONTEXT_VERSION || 'v1',
};
