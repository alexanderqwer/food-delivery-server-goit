const fs = require("fs");
const path = require("path");
const shortid = require("shortid");

const createOrder = (request, response) => {
  const body = request.body;
  const order = { ...body, id: shortid.generate() };
  const pathProducts = path.join(
    __dirname,
    "../../db/products/all-products.json"
  );
  const allProducts = JSON.parse(
    fs.readFileSync(pathProducts, (error, data) => {
      if (error) console.log(error);
      return data;
    })
  );
  const findProduct = order.products.filter((id) =>
    allProducts.find((product) => +product.id === +id)
  );
  if (findProduct.length === order.products.length) {
    const filePath = path.join(__dirname, "../../db/users/all-users.json");
    const allUsers = JSON.parse(
      fs.readFileSync(filePath, (error, data) => {
        if (error) {
          console.log(error);
        }
        return data;
      })
    );
    const userName = allUsers.find((user) => user.id === body.user).username;
    const pathUser = path.join(__dirname, "../../", "db/users/", `${userName}`);
    const pathOrders = path.join(pathUser, "orders/");
    fs.mkdir(pathUser, { recursive: true }, (error) => {
      if (error) console.log(error);
      fs.mkdir(pathOrders, { recursive: true }, (error) => {
        if (error) console.log(error);
        fs.writeFile(
          `${pathOrders}${order.id}.json`,
          JSON.stringify(order),
          (err) => {
            if (err) throw err;
          }
        );
      });
    });
    response.writeHead(200, { "Content-Type": "application/json" });
    response.end(
      JSON.stringify({
        status: "success",
        order,
      })
    );
  } else {
    response.writeHead(200, { "Content-Type": "application/json" });
    response.end(
      JSON.stringify({
        status: "failed",
        order: null,
      })
    );
  }
};

module.exports = createOrder;
