const Product = require("../../modules/db/schemas/product");

const createProduct = (request, response) => {
  const body = request.body;

  const newProduct = new Product(body);

  const sendResponse = (product) => {
    response.json({
      status: "success",
      product,
    });
  };

  const sendError = () => {
    response.status(400);
    response.json({
      error: "product was not saved",
    });
  };

  newProduct.save().then(sendResponse).catch(sendError);
};

module.exports = createProduct;
