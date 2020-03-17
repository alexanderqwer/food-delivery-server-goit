const fs = require("fs");
const path = require("path");
const productsRoute = (request, response) => {
  if (request.method === "GET") {
    const filePath = path.join(
      __dirname,
      "../../db/products/all-products.json"
    );
    fs.readFile(filePath, (err, data) => {
      if (err) console.log(err);
      response.writeHead(200, { "Content-Type": "application/json" });
      response.end(data);
    });
  } else {
    response.writeHead(405, { "Content-Type": "text/html" });
    response.end("<h1>Products other method</h1>");
  }
};

module.exports = productsRoute;
