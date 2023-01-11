const { setResponseWithSuccess } = require('../../util/common-response');

/* eslint-disable no-console */
const newUserResponse = (req, res) => {
  console.log(`newUserResponse: ${req.method} ${req.originalUrl}`);
  return setResponseWithSuccess(res, 200, 'User created successfully');
};

module.exports = { newUserResponse };
