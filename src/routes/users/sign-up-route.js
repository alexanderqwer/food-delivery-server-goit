// const qs = require('querystring');
const fs = require("fs");
const path = require("path");

const signUpRoute = (request, response) => {
  if (request.method === "POST") {
    request.on("data", data => {
      const user = JSON.parse(data);
      const filePath = path.join(__dirname, "../../db/users");
      fs.writeFile(
        `${filePath}/${user.username}.json`,
        JSON.stringify(user),
        err => {
          if (err) throw err;
        }
      );
      response.writeHead(200, { "Content-Type": "application/json" });
      response.end(
        JSON.stringify({
          status: "success",
          user
        })
      );
    });
  } else {
    response.writeHead(405, { "Content-Type": "text/html" });
    response.write("<h1>SignUp other method</h1>");
    response.end();
  }
};

module.exports = signUpRoute;
