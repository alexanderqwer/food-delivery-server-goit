const Order = require("../../modules/db/schemas/order");

const findOreder = (request, response) => {
  const id = request.params.id;
  const sendError = () => {
    response.status(400);
    response.json({
      status: "error",
      text: "there is no such order",
    });
  };

  const sendResponse = (order) => {
    if (!order) {
      return sendError();
    }

    response.json({
      status: "success",
      order,
    });
  };

  Order.findOne({ _id: id }).then(sendResponse).catch(sendError);
};

module.exports = findOreder;
