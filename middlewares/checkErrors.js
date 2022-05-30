// This function gets an error if it exists from the previous middlewares
//and make a response with it
const checkErrors = (error, req, res, next) => {
  console.error(error);
  res.status(error.httpStatus || 500).send({
    status: "error",
    data: error.message,
  });
};

module.exports = {
  checkErrors,
};
