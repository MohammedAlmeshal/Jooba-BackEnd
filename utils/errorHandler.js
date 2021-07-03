class ErrorHandler extends Error {
  constructor(statusCode, message) {
    super();
    this.statusCode = statusCode;
    this.message = message;
  }
}

const handleError = (err, res) => {
  const { statusCode, message } = err;
  res.status('400').json({
    status: "error",
    statusCode,
    message,
  });
};

module.exports = {
  ErrorHandler,
  handleError,
};
