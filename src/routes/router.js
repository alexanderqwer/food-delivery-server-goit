const express = require("express");
const apiRoutes = express.Router();
const signUpRoute = require("./users/sign-up-route");
const createOrder = require("./orders/createOrder");
const editUser = require("./users/edit-user");
const findOrder = require("./orders/findOrder");
const createProduct = require("./products/createProduct");
const editProduct = require("./products/editProduct");

apiRoutes
  .get("/order/:id", findOrder)
  .post("/users", signUpRoute)
  .post("/orders/", createOrder)
  .post("/product/", createProduct)
  .put("/user/:id", editUser)
  .put("/product/:id", editProduct)
  .get("*", (req, res, next) => {
    res.status(404).send("Route not exists");
  });

module.exports = apiRoutes;
