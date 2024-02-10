const express = require("express");
const dotenv = require("dotenv");
dotenv.config();

const env = process.env.NODE_ENV || "development"; // Set default environment to 'development' if not provided

const cookieParser = require("cookie-parser");
const app = express();
const port = 8000;
const expressLayouts = require("express-ejs-layouts");

const db = require("./config/mongoose");

const session = require("express-session");
const passport = require("passport");
const passportLocal = require("./config/passport-local-strategy");
const passportGoogle = require("./config/passport-google-oauth2-strategy");

const MongoStore = require("connect-mongodb-session")(session);
const sassMiddleware = require("node-sass-middleware"); // Change back to node-sass-middleware

const flash = require("connect-flash");
const customMware = require("./config/middleware");

const chatServer = require("http").Server(app);
const chatSockets = require("./config/chat_sockets").chatSockets(chatServer);
chatServer.listen(5000);
console.log("chat server is listening on port 5000");

const path = require("path");

app.use(
  sassMiddleware({
    src: path.join(__dirname, process.env.ASSET_PATH, "scss"),
    dest: path.join(__dirname, process.env.ASSET_PATH, "css"),
    // debug: true, // Remove debug option
    outputStyle: "extended", // Set output style
    prefix: "/css",
    force: true, // This will recompile sass files on every request (recommended for development)
  })
);

app.use(express.urlencoded());
app.use(cookieParser());

app.use(express.static(process.env.ASSET_PATH));
app.use("/uploads", express.static(__dirname + "/uploads"));

app.use(expressLayouts);

app.set("layout extractStyles", true);
app.set("layout extractScripts", true);

app.set("view engine", "ejs");
app.set("views", "./views");

app.use(
  session({
    name: "codeial",
    secret: process.env.SESSION_COOKIE_KEY,
    saveUninitialized: false,
    resave: false,
    cookie: {
      maxAge: 1000 * 60 * 100,
    },
    store: new MongoStore({
      uri: `mongodb+srv://proakkaushik:${process.env.DB}@cluster0.hedjjdw.mongodb.net/test?retryWrites=true&w=majority`,
      collection: "mySessions",
    }),
  })
);

app.use(passport.initialize());
app.use(passport.session());

app.use(passport.setAuthenticatedUser);

app.use(flash());
app.use(customMware.setFlash);

app.use("/", require("./routes"));

app.listen(port, function (err) {
  if (err) {
    console.log(`Error in running the server: ${err}`);
    return;
  }

  console.log(`Server is running on port :${port}`);
});
