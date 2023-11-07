// Create proyect: express --view=pug video-club
const createError = require("http-errors");
const express = require("express");
const path = require("path");
const cookieParser = require("cookie-parser");
const logger = require("morgan");
const mongoose = require("mongoose");
const acl = require("./config/aclConfig");
const router = express.Router();

const indexRouter = require("./routes/index");
const usersRouter = require("./routes/users");
const directorsRouter = require("./routes/directors");
const membersRouter = require('./routes/members');
const moviesRouter = require('./routes/movies');
const actorsRouter = require('./routes/actors');
const genresRouter = require('./routes/genres');
const copyRouter = require('./routes/copys');
const bookingRouter = require('./routes/bookings');
const awaitListRouter = require('./routes/awaitLists');

const app = express();
// const { expressjwt } = require('express-jwt');

// const jwtKey = "6968b4c8e4312a684fbfb34761c8a00a";

//mongodb://<dbUser>7:<dbPass>7@<URL>i<port>/<dbName>
const url = "mongodb://localhost:27017/video-club";
// Esta conexión permitirá que tu aplicación Node.js realice operaciones de lectura y escritura
// en la base de datos, como guardar datos, recuperar información y más.
mongoose.connect(url, { useNewUrlParser: true, useUnifiedTopology: true });

const db = mongoose.connection;
db.on('open', ()=>{
	console.log("Conexión ok.");

});

db.on('error', ()=>{
	console.log("No se ha podido conectar a la bd.");
});

// view engine setup
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "pug");

app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public")));

// app.use(expressjwt({secret: jwtKey, algorithms: ['HS256']})
//   .unless({path: ['/login']}));

app.use("/", indexRouter);
app.use("/users", usersRouter);
app.use("/directors", directorsRouter);
app.use('/members', membersRouter);
app.use('/movies', moviesRouter);
app.use('/actors', actorsRouter);
app.use('/genres', genresRouter);
app.use('/copys', copyRouter);
app.use('/bookings', bookingRouter);
app.use('/awaitLists', awaitListRouter);

// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404));
});

// error handler
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get("env") === "development" ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render("error");
});

module.exports = app;
