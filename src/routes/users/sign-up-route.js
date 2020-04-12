const fs = require("fs");
const path = require("path");
const shortid = require("shortid");

const signUpRoute = (request, response) => {
  const user = { ...request.body, id: shortid.generate() };
  const filePath = path.join(__dirname, "../../db/users/all-users.json");

  if (!fs.existsSync(filePath)) {
    fs.writeFile(filePath, `[${JSON.stringify(user)}]`, (err) => {
      if (err) throw err;
    });
  } else {
    const allUsers = JSON.parse(
      fs.readFileSync(filePath, (error, data) => {
        if (error) {
          console.log(error);
        }
        return data;
      })
    );
    allUsers.push(user);
    fs.writeFile(filePath, JSON.stringify(allUsers), (err) => {
      if (err) throw err;
    });
  }

  response.writeHead(200, { "Content-Type": "application/json" });
  response.end(
    JSON.stringify({
      status: "success",
      user,
    })
  );
};

module.exports = signUpRoute;
