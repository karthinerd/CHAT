const mongoose = require("mongoose");

const connectDB = async (url) => {
  try {
    await mongoose.connect(url);
    console.log("DataBase Connected Successfully");
  } catch (error) {
    console.error("Error in DataBase Connection => ", error.message);
  }
};

module.exports = {
  connectDB,
};
