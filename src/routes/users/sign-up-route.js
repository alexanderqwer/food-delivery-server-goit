const bcrypt = require("bcrypt");
const User = require("../../modules/db/schemas/user");

const signUpRoute = (request, response) => {
  const body = request.body;
  const hashedPassword = bcrypt.hashSync(body.password, 10);
  const user = { ...body, password: hashedPassword };

  const newUser = new User(user);

  const sendResponse = (user) => {
    console.log(user);

    response.json({
      status: "success",
      user,
    });
  };

  const sendError = () => {
    response.status(400);
    response.json({
      error: "user was not saved",
    });
  };

  newUser.save().then(sendResponse).catch(sendError);
};

module.exports = signUpRoute;
