const mongoose = require("mongoose");

const host = "localhost";
const port = "27017";
const db = "hr";

exports.mongoConnect = () => {
  //Para local
  //const mongoStringConnection = `mongodb://${host}:${port}/${db}`;
  //Para internet (quitamos test)
  const mongoStringConnection = `mongodb+srv://admin:admin@videogame.ae2hpnn.mongodb.net/goza-finanzas`;
  mongoose.connect(mongoStringConnection);
  mongoose.Promise = global.Promise;
  const dbConnection = mongoose.connection;
  dbConnection.on("error", console.error.bind(console, "Mongodb connection error"))
};