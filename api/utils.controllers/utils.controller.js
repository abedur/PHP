const _assignResponse = function (response, status, message) {
    response.status = parseInt(status);
    response.message = message;
}

const _sendResponse = function (res, response) {
    res.status(response.status).json(response.message);
}

module.exports = {
    _assignResponse,
    _sendResponse
}