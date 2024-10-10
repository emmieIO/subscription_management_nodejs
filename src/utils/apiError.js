const apiError = (message, statusCode) => {
    const error = new Error(message);
    error.statusCode = statusCode;
    return error;
  };

module.exports = apiError;