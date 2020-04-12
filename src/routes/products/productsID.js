const fs = require("fs");
const path = require("path");
const productsRoute = (request, response) => {
  const id = request.params.id;
  console.log(id);
  const filePath = path.join(__dirname, "../../db/products/all-products.json");
  fs.readFile(filePath, (error, allProducts) => {
    if (error) {
      console.log(error);
    }
    const productFind = JSON.parse(allProducts).find(
      (product) => +product.id === +id
    );
    response.writeHead(200, {
      "Content-Type": "application/json",
    });
    if (productFind) {
      response.end(
        JSON.stringify({
          status: "success",
          product: productFind,
        })
      );
    } else {
      response.end(
        JSON.stringify({
          status: "no products",
          product: [],
        })
      );
    }
  });
};

module.exports = productsRoute;
