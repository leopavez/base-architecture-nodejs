/* eslint-disable no-console */
const testApiController = (req) => {
  console.log(`testApiController: ${req.method} ${req.originalUrl}`);

  return { message: 'testApiController successfull' };
};

module.exports = { testApiController };
