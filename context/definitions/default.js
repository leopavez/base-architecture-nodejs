module.exports = {
    name: process.env.NODE_CONTEXT_NAME || 'api-services-base',
    port: process.env.NODE_CONTEXT_PORT || 3000,
    mongoConnection: {
        mongoUri: process.env.MONGO_DB_URI || '',
        mongoUser: process.env.MONGO_DB_USER || '',
        mongoPassword: process.env.MONGO_DB_PASSWORD || '',
    },
    middlewares: {
        testApi: process.env.NODE_CONTEXT_MIDDLEWARE_TEST_API ||
        [
            'test-api-middleware',
            'test-api-response',
        ]
    },
    country: process.env.NODE_CONTEXT_COUNTRY || 'cl',
    version: process.env.NODE_CONTEXT_VERSION || 'v1',
}