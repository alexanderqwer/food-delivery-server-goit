const express = require("express");
const apiRoutes = express.Router();
const productsRoute = require("./products/productsRoute");
const signUpRoute = require("./users/sign-up-route");
const productsID = require("./products/productsID");
const usersID = require("./users/usersID");
const createOrder = require("./orders/createOrders");
const productsIDS = require("./products/productsIDS");

const queryRoute = (request, response, next) => {
  if (request.query.ids) {
    productsIDS(request, response);
  } else {
    next();
  }
};

apiRoutes
  .get("/products", queryRoute, productsRoute)
  .get("/products/:id", productsID)
  .get("/users/:id", usersID)
  .post("/users", signUpRoute)
  .post("/orders/", createOrder)
  .get("*", (req, res, next) => {
    res.status(404).send("Route not exists");
  });

module.exports = apiRoutes;
