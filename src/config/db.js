const mongoose = require("mongoose");

const connectToDatabase = async () => {
  try {
    const connectionString = process.env.DB_URL;
    await mongoose.connect(connectionString);
    console.log(`Connected to the ${connectionString}`);
  } catch (error) {
    console.error("Error connecting to the database:", error);
  }
};

module.exports = connectToDatabase;
