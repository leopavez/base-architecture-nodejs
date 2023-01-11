module.exports = {
  testApi: process.env.NODE_CONTEXT_MIDDLEWARE_TEST_API
        || [
          'test-api-middleware',
          'test-api-response',
        ],
  registerNewUser: process.env.NODE_CONTEXT_MIDDLEWARE_REGISTER_NEW_USER
        || [
          'check-country-middleware',
          'check-email-middleware',
          'check-name-middleware',
          'check-password-middleware',
          'check-phone-middleware',
          'check-user-type-middleware',
          'create-new-user-middleware',
          'new-user-response',
        ],
};
