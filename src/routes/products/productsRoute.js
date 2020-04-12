const fs = require("fs");
const path = require("path");
const productsRoute = (request, response) => {
  const filePath = path.join(__dirname, "../../db/products/all-products.json");
  fs.readFile(filePath, (err, data) => {
    if (err) console.log(err);
    response.writeHead(200, { "Content-Type": "application/json" });
    response.end(data);
  });
};

module.exports = productsRoute;
