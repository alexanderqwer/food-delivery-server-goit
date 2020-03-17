const productsRoute = require("./products/productsRoute");
const signUpRoute = require("./users/sign-up-route");

const router = {
  "/products": productsRoute,
  "/signup": signUpRoute
};

module.exports = router;
