// this function gets an error if it happens from the previous middlewares
//and make a response with it
const checkErrors = (error, req, res, next) => {
  console.error(error);
  res.status(error.httpStatus || 500).send({
    status: "error",
    message: error.message,
  });
};

module.exports = {
  checkErrors,
};
