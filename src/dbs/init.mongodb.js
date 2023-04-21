const mongoose = require("mongoose");
const connectionString = `mongodb://127.0.0.1:27017/shopDEV`;
const { countConnect } = require("../helpers/checkConnect");

class Database {
  constructor() {
    this.connect();
  }

  connect(type = "mongodb") {
    if (true) {
      mongoose.set("debug", true);
      mongoose.set("debug", { color: true });
    }

    mongoose
      .connect(connectionString)
      .then((_) => {
        console.log(`Connected MongoDB Success`);
        countConnect();
      })
      .catch((err) => console.log(err));
  }

  static getInstance() {
    if (!Database.instance) {
      Database.instance = new Database();
    }

    return Database.instance;
  }
}

const instanceMongoDb = Database.getInstance();
module.export = instanceMongoDb;
