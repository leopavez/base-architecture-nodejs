/* eslint-disable no-console */
const { setResponseWithError } = require('../util/common-response');
const controller = require('../controllers/create-new-user-controller');

const createNewUserMiddleware = async (req, res, next) => {
  try {
    console.log(`createNewUserMiddleware: ${req.method} ${req.originalUrl}`);
    req.user = await controller.createNewUserController(req);
    return next();
  } catch (error) {
    console.error(`Error in createNewUserMiddleware: ${error.message}`);
    return setResponseWithError(res, 400, `Error in createNewUserMiddleware: ${error.message}`);
  }
};

module.exports = { createNewUserMiddleware };
