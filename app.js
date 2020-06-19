const express = require("express");
const fs = require("fs");
const path = require("path");
const bodyParser = require("body-parser");
const HttpError = require("./models/http-error");
const adsRoutes = require("./routes/ads-routes");
const usersRoutes = require("./routes/users-routes");

const mongoose = require("mongoose");

const app = express();
app.use(bodyParser.json());

app.use("/uploads/images", express.static(path.join("uploads", "images")));

app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader(
    "Access-Control-Allow-Headers",
    "Origin,X-Ruquested-With,Content-Type,Accept,Authorization"
  );
  res.setHeader("Access-Control-Allow-Methods", "GET,POST,PATCH,DELETE");
  next();
});

app.use("/api/ads", adsRoutes);
app.use("/api/users", usersRoutes);
app.use((req, res, next) => {
  const error = new HttpError("COuld not find this route", 404);
  throw error;
});

app.use((error, req, res, next) => {
  if (req.file) {
    fs.unlink(req.file.path, (err) => {
      console.log(err);
    });
  }
  if (res.headerSent) {
    return next(error);
  }
  res.status(error.code || 500);
  res.json({ message: error.message || "UNKNOWN ERROR OCCURED BRO" });
});
mongoose
  .connect(
    "mongodb+srv://abd:abd123@bismillah-f5fdy.mongodb.net/Renting?retryWrites=true&w=majority",
    { useNewUrlParser: true, useUnifiedTopology: true, useCreateIndex: true }
  )
  .then(() => {
    app.listen(5000);
  })
  .catch((err) => {
    console.log("Yar mongo DB connection mai masla");
  });
