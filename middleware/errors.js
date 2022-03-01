const logger = require("../config/logger");

const joiErrors = (error) => {
  return error.details.map((err) => {
    const msg = {};
    msg[err.path[0]] = err.message;
    return msg;
  });
};

const modelErrors = (error) => {
  const { errors } = error;

  if (error.name === "SequelizeUniqueConstraintError") {
    return errors.map((err) => {
      const msg = {};
      if (err.path.includes(".")) {
        msg[err.path.split(".")[1]] = `${err.path
          .split(".")[1]
          .charAt(0)
          .toUpperCase()}${err.path.split(".")[1].slice(1)} already exist.`;
        return msg;
      }
      msg[err.path] = `${err.path.charAt(0).toUpperCase()}${err.path.slice(
        1
      )} already exist.`;
      return msg;
    });
  }

  if (error.name === "SequelizeValidationError") {
    return errors.map((err) => {
      const msg = {};
      msg[err.path] = err.message;
      return msg;
    });
  }
};

module.exports = (err, req, res, next) => {
  err.statusCode = err.statusCode || 500;

  logger.error({
    message: err.message,
    status: err.statusCode,
    stack: err.stack
  });

  // Handling Joi Validation Error
  if (err.details) {
    const errors = joiErrors(err);
    return res.status(400).json({
      success: false,
      error: errors
    });
  }

  // Handling Sequelize Validation Error
  if (
    err.name === "SequelizeValidationError" ||
    err.name === "SequelizeUniqueConstraintError" ||
    err.name === "SequelizeForeignKeyConstraintError"
  ) {
    const errors = modelErrors(err);
    return res.status(400).json({
      success: false,
      error: errors
    });
  }

  let error = { ...err };
  error.message = err.message;
  res.status(error.statusCode).json({
    success: false,
    message: error.message || "Internal Server Error."
  });
};
