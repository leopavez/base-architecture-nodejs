const { Router } = require('express');
const { context } = require('../config');
const { getMiddlewares } = require('../util/mapping-middleware');

const router = Router();

router.get('/test-api', getMiddlewares(context.middlewares.testApi));

module.exports = router;
