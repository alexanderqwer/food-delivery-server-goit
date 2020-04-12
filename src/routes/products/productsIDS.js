const fs = require("fs");
const path = require("path");
const productsIDS = (request, response) => {
  const ids = request.query.ids.slice(1, -1).split(",");
  const filePath = path.join(__dirname, "../../db/products/all-products.json");
  fs.readFile(filePath, (error, allProducts) => {
    if (error) {
      console.log(error);
    }
    allProducts = JSON.parse(allProducts);
    const productFind = [];
    ids.forEach((id) =>
      allProducts.find((product) => {
        if (+product.id === +id) productFind.push(product);
        return;
      })
    );
    response.writeHead(200, {
      "Content-Type": "application/json",
    });
    if (productFind.length === ids.length) {
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

module.exports = productsIDS;
