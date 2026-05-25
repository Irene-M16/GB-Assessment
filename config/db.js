const mongoose = require("mongoose");

const connectDb = async () => {
  try {
    const conn = await mongoose.connect(process.env.DATABASE);

    console.log("You don't need to debug, it is connected");
  } catch (error) {
    console.error(`Connection error: ${error.message}`);
    process.exit(1);
  }
};

module.exports = connectDb;