const setResponseWithError = require('../util/common-response').setResponseWithError;
const controller = require('../controllers/test-api-controller');

const testApiMiddleware = async (req, res, next) => {
    try {
        console.log(`testApiMiddleware: ${req.method} ${req.originalUrl}`);
        req.test = await controller.testApiController(req);
        return next();
    } catch (error) {
        console.log(`Error in testApiMiddleware: ${error.message}`);
        return setResponseWithError(res, 400, `Error in testApiMiddleware: ${error.message}`);
    }
};

module.exports = { testApiMiddleware }