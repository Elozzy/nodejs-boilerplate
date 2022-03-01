require("dotenv").config();
const express = require("express");
const app = express();
const expressFileupload = require("express-fileupload");
const server = require("http").Server(app);
const cors = require("cors");

// middleware
const errorMiddleware = require("./middleware/errors");
const ErrorHandler = require("./utils/ErrorHandler");

// require route
const allRoutes = require("./routes");
const swaggerUi = require("swagger-ui-express");
const swaggerDocument = require("./boilerplatedoc.json");

const PORT = process.env.PORT || 4000;

// express middleware
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use("/files", express.static(__dirname + "/public"));

// express fileupload
app.use(expressFileupload());

// Setup CORS
app.use(cors());

// api documentation
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerDocument));

// all routes
app.use("/v1", allRoutes);

// Handle unhandled routes
app.all("*", (req, res, next) => {
  next(new ErrorHandler(`${req.originalUrl} route not found`, 404));
});

// error handler
app.use(errorMiddleware);

server.listen(PORT, () => console.log(`Server is live on port ${PORT}`));

module.exports = server;
