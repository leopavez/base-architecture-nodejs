const { setResponseWithError } = require('../../util/common-response');

const checkNameMiddleware = (req, res, next) => {
  if (!req.body.name) {
    return setResponseWithError(res, 400, 'Name is required');
  }
  req.name = req.body.name;
  return next();
};

module.exports = { checkNameMiddleware };
