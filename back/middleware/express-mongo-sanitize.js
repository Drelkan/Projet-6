const express = require("express");
const bodyParser = require("body-parser");
const mongoSanitize = require("express-mongo-sanitize");

const app = express();

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.use(
  mongoSanitize({
    allowDots: true,
  })
);
