/* eslint-disable no-console */
const testApiResponse = (req, res) => {
  console.log(`testApiResponse: ${req.method} ${req.originalUrl}`);
  return res.status(200).json({ message: 'testApiResponse successfull' });
};

module.exports = { testApiResponse };
