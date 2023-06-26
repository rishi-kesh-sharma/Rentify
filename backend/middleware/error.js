const notfound = (req, res, next) => {
  const error = new Error(`Not found - ${req.originalUrl}`);
  res.status(400);
  next(error);
};

const errorHandler = (err, req, res, next) => {
  let statusCode = res.statusCode === 200 ? 500 : res.statusCode;
  let message = err.message;

  if (err.name === "CastError" && err.kind === "ObjectId") {
    stausCode = 404;
    message = "Resource not Found";
  }
  res.status(statusCode).json({ message });
};

module.exports = { notfound, errorHandler };
