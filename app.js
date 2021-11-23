require("dotenv").config();

const express = require("express");
const hbs = require("hbs");
const cookieParser = require("cookie-parser");

const app = express();
const PORT = 3000;

// DATABASE CONNECTION
mongoose
  .connect(process.env.MONGODB_URI)
  .then(() => {
    console.log("Connected to the database!");
  })
  .catch((err) => console.log(err));

// SET THE TEMPLATE ENGINE
app.set("view engine", "hbs");
app.set("views", __dirname + "/views");

// REGISTER THE PARTIAL
hbs.registerPartials(__dirname + "/views/partials");

// MIDDLEWARE
// Handles access to the public folder
app.use(express.static("public"));

// To have access to `body` property in the request
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// ℹ️ Needed when we deal with cookies (we will when dealing with authentication)
app.use(cookieParser());

// START THE SERVER
app.listen(PORT, () => console.log(`Server listening on port ${PORT} !`));
