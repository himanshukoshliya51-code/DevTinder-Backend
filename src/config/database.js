const mongoose = require("mongoose");

const connectDB = async () => {
  await mongoose.connect(
    "mongodb+srv://himanshukoshliya51_db_user:Himanshu162006@namastenode.lkuhesg.mongodb.net/devTinder"
  );
};

module.exports = connectDB;