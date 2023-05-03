const express = require("express");
const mongoose = require("mongoose");
const app = express();
const userRoutes = require("./routes/user");
const sauceRoutes = require("./routes/sauce");
const path = require("path");

// Ajout d'helmet
const helmet = require("helmet");
app.use(helmet());

// Ajout de dotenv

mongoose
  .connect(
    "mongodb+srv://dreinan7676:ut5bcIe7WPwlPyWf@cluster0.qln7rqc.mongodb.net/piiquante?retryWrites=true&w=majority",
    {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    }
  )
  .then(() => console.log("connection a la base de donnée mango reussi"))
  .catch(() => console.log("connection échouer a la base de donnée mango"));

app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content, Accept, Content-Type, Authorization"
  );
  res.setHeader(
    "Access-Control-Allow-Methods",
    "GET, POST, PUT, DELETE, PATCH, OPTIONS"
  );
  res.setHeader("Cross-Origin-Resource-Policy", "same-site");
  next();
});

app.use(express.json());

app.use("/images", express.static(path.join(__dirname, "images")));

app.use("/api/auth", userRoutes);
app.use("/api/sauces", sauceRoutes);

module.exports = app;
