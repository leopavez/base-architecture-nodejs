const Router = require('express').Router;
const context = require('../config').context;
const getMiddlewares = require('../util/mapping-middleware').getMiddlewares;

const router = Router();

router.get('/test-api', getMiddlewares(context.middlewares.testApi));


module.exports = router;