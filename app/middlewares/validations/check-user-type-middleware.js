/* eslint-disable no-unused-vars */
/* eslint-disable camelcase */
const { setResponseWithError } = require('../../util/common-response');
const { enumUserTypes } = require('../../util/enum');

const checkUserTypeMiddleware = (req, res, next) => {
  const { user_type } = req.body;
  if (!user_type) {
    return setResponseWithError(res, 400, 'user_type is required');
  }
  if (!Object.values(enumUserTypes).includes(user_type)) {
    return setResponseWithError(res, 400, 'user_type is invalid');
  }
  req.user_type = user_type;
  return next();
};

module.exports = { checkUserTypeMiddleware };
