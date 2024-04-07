const express = require("express");
const dotenv = require("dotenv");
const morgan = require("morgan");
const mongoose = require("mongoose");
const path = require("path");
const passport = require("passport");
const session = require("express-session");
const MongoStore = require("connect-mongo");
const flash = require("connect-flash");
const auth = require("./routes/auth");

dotenv.config();

const app = express();

app.use(
  session({
    secret: "gfkjdngkjfdjndnfgnnkjnjnkjnkjj",
    resave: false,
    saveUninitialized: false,
    store: MongoStore.create({ mongoUrl: process.env.MONGODB_URL }),
  })
);

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(morgan("dev"));
app.use(express.static(path.join(__dirname, "public")));
app.set("view engine", "ejs");

app.use(passport.initialize());
app.use(passport.session());
app.use(flash());

require("./passport/passport");
app.use("/", auth);

mongoose.connect(process.env.MONGODB_URL).then(() => {
  app.listen(process.env.PORT, () => {
    console.log(`server is running on port ${process.env.PORT}`);
  });
});
