const { setResponseWithError } = require('../../util/common-response');

const checkPhoneMiddleware = (req, res, next) => {
  if (!req.body.phone) {
    return setResponseWithError(res, 400, 'Phone is required');
  }
  if (req.body.phone.length < 9 || req.body.phone.length > 9) {
    return setResponseWithError(res, 400, '9 digits are required');
  }
  if (!req.body.phone.match(/^[0-9]+$/)) {
    return setResponseWithError(res, 400, 'Phone is not valid');
  }
  req.phone = req.body.phone;
  return next();
};

module.exports = { checkPhoneMiddleware };
