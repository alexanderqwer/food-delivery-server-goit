const Product = require("../../modules/db/schemas/product");

const editProduct = (request, response) => {
  const body = request.body;
  const id = request.params.id;

  const sendError = () => {
    response.status(400);
    response.json({
      status: "error",
      text: "there is no such user",
    });
  };

  const sendResponse = (product) => {
    if (!product) {
      return sendError();
    }

    response.json({
      status: "success",
      product,
    });
  };

  Product.findOneAndUpdate({ _id: id }, body, { new: true })
    .then(sendResponse)
    .catch(sendError);
};

module.exports = editProduct;
