const fs = require("fs");
const path = require("path");
let code = "";
const message = {};
const getId = (url) => {
  const lastIndex = url.lastIndexOf("/");
  if (lastIndex !== -1) {
    return url.slice(lastIndex + 1);
  }
};

const getIds = (url) => {
  return new URL(`https://localhost${url}`).searchParams
    .get("ids")
    .slice(1, -1)
    .split(",");
};

const getCategory = (url) => {
  return new URL(`https://localhost${url}`).searchParams
    .get("category")
    .slice(1, -1)
    .split(",");
};
const resQuery = (data, bool = true) => {
  if (bool && data) {
    code = "200";
    message.status = "success";
    message.products = data;
  } else {
    code = "406";
    message.status = "no products";
    message.products = [];
  }
};
const resByQuery = (url, data) => {
  if (url.includes("ids")) {
    const ids = getIds(url);
    const productIds = data.filter(
      (product) => ids.filter((id) => +id === product.id).length > 0
    );
    resQuery(productIds, productIds.length === ids.length);
    return;
  }
  if (url.includes("category")) {
    const category = getCategory(url);
    const productCategory = data.filter(
      (product) =>
        category.filter(
          (urlCategory) =>
            product.categories.filter(
              (productCategory) => urlCategory === productCategory
            ).length > 0
        ).length > 0
    );
    resQuery(productCategory, productCategory.length === category.length);
    return;
  }
  const id = getId(url);
  const productId = data.filter((product) => +product.id === +id);
  resQuery(productId);
  return;
};

const productsRoute = (request, response) => {
  if (request.method === "GET") {
    const filePath = path.join(
      __dirname,
      "../../db/products/all-products.json"
    );
    const allProducts = JSON.parse(fs.readFileSync(filePath));
    if (request.url === "/products") {
      resQuery(allProducts);
    } else {
      resByQuery(request.url, allProducts);
    }
    response.writeHead(code, { "Content-Type": "application/json" });
    response.end(JSON.stringify(message));
  } else {
    response.writeHead(405, { "Content-Type": "text/html" });
    response.end("<h1>Products other method</h1>");
  }
};

module.exports = productsRoute;
