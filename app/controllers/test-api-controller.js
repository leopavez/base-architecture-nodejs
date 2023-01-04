const testApiController = (req, res) => {
    console.log(`testApiController: ${req.method} ${req.originalUrl}`);

    return { message: 'testApiController successfull'}
};

module.exports = { testApiController };