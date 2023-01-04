function setResponseWithError(res, status, message, code = 'error'){
    return res.status(status).send({ code, message });
}

function setResponseWithSuccess(res, status, message, code = 'success'){
    return res.status(status).send({ code, message });
}

module.exports = { setResponseWithError, setResponseWithSuccess }