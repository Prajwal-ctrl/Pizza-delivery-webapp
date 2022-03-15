require("dotenv").config();
const express = require("express");
const app = express();
const ejs = require("ejs");
const path = require("path");
const expressLayout = require("express-ejs-layouts");
//either listen on build port or 3000 port
const PORT = process.env.PORT || 3300;
//importing mongoose
const mongoose = require("mongoose");
const flash = require("express-flash");
const session = require("express-session");
const MongoDbStore = require("connect-mongo");

// database connection :

const url = "mongodb://localhost:27017/pizza";
mongoose.connect(url, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});
const connection = mongoose.connection;
connection
  .once("open", () => {
    console.log(`CONNECTED TO MONGO!`);
  })
  .on("error", (err) => {
    console.log(`OH NO! MONGO CONNECTION ERROR!`);
    console.log(err);
  });

//session store in mongodb using mongoose :
let mongoStore = MongoDbStore.create({
  mongoUrl: url,
  mongooseConnection: connection,
  collection: "sessions",
});

//session config files for mongodb :
app.use(
  session({
    secret: process.env.COOKIE_SECRET,
    resave: false,
    store: mongoStore,
    saveUninitialized: false,
    cookie: { maxAge: 1000 * 60 * 60 * 24 },
  })
);

app.use(flash());
// rendering home.html/ejs page to the / i.e home page
app.use(express.static("public"));
app.use(express.json());
//global middleware :

app.use((req, res, next) => {
  res.locals.session = req.session;
  next();
});

//set template engine :
app.use(expressLayout);
app.set("views", path.join(__dirname, "/resources/views"));
app.set("view engine", "ejs");

require("./routes/web.js")(app);

//creating live server on port 3300
app.listen(PORT, () => {
  console.log(`listen on port ${PORT}`);
});
