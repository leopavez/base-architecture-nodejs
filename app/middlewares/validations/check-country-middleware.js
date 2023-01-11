const { setResponseWithError } = require('../../util/common-response');
const { context } = require('../../config');

const checkCountryMiddleware = (req, res, next) => {
  if (!req.headers['x-country']) {
    return setResponseWithError(res, 400, 'Country is required');
  }
  if (req.headers['x-country'].toLowerCase() === context.country) {
    req.country = req.headers['x-country'].toLowerCase();
    return next();
  }
  return setResponseWithError(res, 400, 'Country is not valid');
};

module.exports = { checkCountryMiddleware };
