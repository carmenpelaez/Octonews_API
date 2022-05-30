//Call this function if the endpoint doesn't exists

const notFound = (req, res) => {
  res.status(404).send({
    status: "error",
    data: "Not found",
  });
};

module.exports = {
  notFound,
};
