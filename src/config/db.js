const mongoose = require("mongoose");
mongoose.set("strictQuery", false);
module.exports = async () => {
  return mongoose.connect(
    process.env.DB_URI || "mongodb://127.0.0.1:27017/mock12"
  );
};
