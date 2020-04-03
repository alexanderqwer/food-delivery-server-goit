const fs = require("fs");
const path = require("path");
const usersID = (request, response) => {
  const id = request.params.id;
  const filePath = path.join(__dirname, "../../db/users/all-users.json");
  fs.readFile(filePath, (error, allUsers) => {
    if (error) {
      console.log(error);
    }
    const userFind = JSON.parse(allUsers).find((user) => user.id === id);
    response.writeHead(200, {
      "Content-Type": "application/json",
    });
    if (userFind) {
      response.end(
        JSON.stringify({
          status: "success",
          user: userFind,
        })
      );
    } else {
      response.end(
        JSON.stringify({
          status: "no users",
          user: [],
        })
      );
    }
  });
};

module.exports = usersID;
