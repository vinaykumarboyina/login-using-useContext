const mongoose = require("mongoose");

const connectDB = async () => {
  try {
    const con = await mongoose
      .connect(process.env.DB_URL)
      .then(() => console.log("Database connected!"));
  } catch (err) {
    console.log(err);
  }
};

module.exports = connectDB;
