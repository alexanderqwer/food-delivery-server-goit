const Order = require("../../modules/db/schemas/order");

const createOrder = (request, response) => {
  const body = request.body;

  const newOrder = new Order(body);

  const sendResponse = (order) => {
    console.log(order);

    response.json({
      status: "success",
      order,
    });
  };

  const sendError = (err) => {
    console.log(err);
    response.status(400);
    response.json({
      error: "order was not saved",
    });
  };

  newOrder.save().then(sendResponse).catch(sendError);
};

module.exports = createOrder;
