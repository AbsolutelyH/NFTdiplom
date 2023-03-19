const express = require("express");
const morgan = require("morgan");
const rateLimit = require("express-rate-limit");
const helmet = require("helmet");
const mongoSanitize = require("express-mongo-sanitize");
const xss = require("xss-clean");
const hpp = require("hpp");

const AppError = require("./API/Utils/appError");
const globalErrorHandler = require("./API/controllers/errorController");
const nftsRouter = require("./API/routes/nftsRoute");
const usersRouter = require("./API/routes/usersRoute");

const app = express();
app.use(express.json({limit: "10kb"}));


//DATA SANITAZATION against NoSql query injection
app.use(mongoSanitize());
//DATA SANITIZATION against site script XSS
app.use(xss());
//PRVENT PARAMETER POLLUTION
app.use(hpp({
  whitelist: ["price"],
}
));
//SECURE HEADER HTTP
// app.use(helmet()); // не дает запускать приложение
//GLOBAL MIDDLEWARE
const limiter = rateLimit({
  max: 100,
  windowMs: 60 * 60 * 1000,
  message: "Too many request from this IP, please try again in an hour",
});

app.use("/api", limiter);

app.use(morgan("dev"));
//SERVING TEMPLATE DEMO
app.use(express.static(`${__dirname}/nft-data/img`));

// //CUSTOM MIDDLE WARE
// app.use((req, res, next) => {
//   console.log("Hey i am from middleware function 👋");
//   next();
// });

app.use((req, res, next) => {
  req.requestTime = new Date().toISOString();
  next();
});

app.use('/upload', express.static('uploads'));
app.use("/api/v1/nfts", nftsRouter);
app.use("/api/v1/users", usersRouter);

// app.all("*", (req, res, next) => {
//   next(new AppError(`Cant find ${req.originalUrl} on this server`, 404)); // не дает запускать приложение
// });

//Global ERROR Handling
app.use(globalErrorHandler);

module.exports = app;