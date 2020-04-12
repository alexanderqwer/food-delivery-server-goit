const dbUser = "Alexandr";
const dbPassword = "qwerty12345";

const config = {
  port: 3001,
  dbUser,
  dbPassword,
  databaseUrl: `mongodb+srv://${dbUser}:${dbPassword}@cluster0-atobn.mongodb.net/test?retryWrites=true&w=majority`,
};

module.exports = config;
