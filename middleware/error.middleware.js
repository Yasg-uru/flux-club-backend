const errorMiddleware = (err, req, res, next) => {
  err.statuscode = err.statuscode || 500;
  err.message = err.message || "Internal Server Error";

  e;
  res.status(err.statuscode).json({
    success: false,
    message: err.message,
  });
};

export default errorMiddleware;
