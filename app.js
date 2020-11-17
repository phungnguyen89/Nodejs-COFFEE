require("dotenv").config();
var createError = require("http-errors");
var express = require("express");
var path = require("path");
const helmet = require("helmet");
const bodyParser = require("body-parser");
var cookieParser = require("cookie-parser");
//const passport = require("passport");
var logger = require("morgan");
const cors = require("cors");
//const dotenv = require("dotenv");
const configs = require("./src/configs/configs");
//connect to database
require(".//src/configs/configs").connectDatabase();
const Handlebars = require("handlebars");
const expressHandlebars = require("express-handlebars");
const { allowInsecurePrototypeAccess } = require("@handlebars/allow-prototype-access");
const helper = require("./src/helper");
var app = express();

appConfig = () => {
  app.use(helmet());
  // view engine setup
  app.set("views", path.join(__dirname, "src/views"));
  app.set("view engine", "html");
  app.engine(
    "html",
    expressHandlebars({
      extname: ".html",
      handlebars: allowInsecurePrototypeAccess(Handlebars),
      defaultLayout: "main",
      layoutsDir: path.join(__dirname, "/src/views/layouts"),
      partialsDir: path.join(__dirname, "/src/views/partials"),
      helpers: {
        pag: helper.pag,
        page: helper.page,
        //list of function helper
      },
    })
  );

  // use middleware
  app.use(logger("dev"));
  app.use(cors());

  app.use(bodyParser.json());
  app.use(bodyParser.urlencoded({ extended: false }));
  app.use(express.json());
  app.use(express.urlencoded({ extended: false }));

  app.use(cookieParser());
  app.use(express.static(path.join(__dirname, "public")));

  //app.use(passport.initialize());
  //app.use(passport.session());

  //port
  const port = process.env.PORT || 3000;
  app.listen(port, () => console.log("Server started listening on PORT " + port));
};
appConfig();

appRouting = () => {
  // routing
  const home = require("./src/routes/home");
  const user = require("./src/routes/user");
  const product = require("./src/routes/product");
  const cart = require("./src/routes/cart");
  const api = require("./src/api/route");

  app.use("/", home);
  app.use("/api", api);

  app.use("/user", user);

  //use auth middleware
  const auth = require("./src/middlewares/auth");

  app.use("/cart", cart);
  //app.use("/cart", auth.auth, cart);
  //use authorize middleware

  app.use("/product", product);
  //app.use("/product", auth.authorization, product);
};

appRouting();

handleError = () => {
  //404 not found
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
    res.render("error", { title: "ERROR", layout: false });
  });
};

handleError();

module.exports = app;
