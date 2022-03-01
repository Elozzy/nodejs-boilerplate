const { createLogger, format, transports } = require("winston");
const DailyRotateFile = require("winston-daily-rotate-file");
const path = require("path");
const { combine, errors, json, prettyPrint, timestamp } = format;

const logDir = path.join(__dirname, "..", "logs");

const options = {
  json: true,
  dirname: logDir,
  filename: "%DATE%",
  datePattern: "YYYY-MM-DD",
  utc: false,
  extension: ".log",
  maxFiles: "1d"
};

const logger = createLogger({
  format: combine(errors({ stack: true }), json(), timestamp(), prettyPrint()),
  transports: new DailyRotateFile(options)
});

if (process.env.NODE_ENV === "development") {
  logger.add(new transports.Console());
}

module.exports = logger;
