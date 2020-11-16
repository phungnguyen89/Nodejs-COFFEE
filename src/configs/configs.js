const mongoose = require("mongoose");
const configs = {};
configs.connectDatabase = () => {
  const mongoDbUrl = "mongodb://127.0.0.1:27017/coffee";
  //const mongoDbUrl = `mongodb://${process.env.MONGO_HOST}:${process.env.MONGO_PORT}/${process.env.MONGO_DB}`;
  //const mongoDbUrl = `${process.env.MONGO_PROTOCOL}${process.env.MONGO_USERNAME}:${process.env.MONGO_PASSWORD}@${process.env.MONGO_HOST}/${process.env.MONGO_DB}?retryWrites=true&w=majority`;

  //mongodb+srv://admin:admin@coffee.a9wil.mongodb.net:27017/coffee?retryWrites=true&w=majority
  //mongodb+srv://admin:admin@coffee.a9wil.mongodb.net/coffee?retryWrites=true&w=majority
  console.log(`Try connecting to ${mongoDbUrl}`);
  mongoose.Promise = global.Promise;
  // Connecting to the database
  mongoose
    .connect(mongoDbUrl, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      useCreateIndex: true,
      useFindAndModify: false,
    })
    .then(() => {
      console.log("Successfully connected to the database");
    })
    .catch((err) => {
      console.log(`Could not connect to the database. Exiting now...\n${err}`);
      process.exit();
    });
};

module.exports = configs;
