const { setResponseWithError } = require('../../util/common-response');

const checkEmailMiddleware = (req, res, next) => {
  if (!req.body.email) {
    return setResponseWithError(res, 400, 'Email is required');
  }
  if (req.body.email.length > 100) {
    return setResponseWithError(res, 400, 'Email is too long');
  }
  if (!req.body.email.match(/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i)) {
    return setResponseWithError(res, 400, 'Email is not valid');
  }
  req.email = req.body.email;
  return next();
};

module.exports = { checkEmailMiddleware };
