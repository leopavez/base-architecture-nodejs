const { setResponseWithError } = require('../../util/common-response');
const { encryptPassword } = require('../../util/helpers');

const checkPasswordMiddleware = async (req, res, next) => {
  if (!req.body.password) {
    return setResponseWithError(res, 400, 'Password is required');
  }
  if (req.body.password.length < 4) {
    return setResponseWithError(res, 400, 'Password is too short, minimum 4 characters');
  }
  req.password = await encryptPassword(req.body.password);
  return next();
};

module.exports = { checkPasswordMiddleware };
