const mongoose = require('mongoose');
const keys=require('./keys')

exports.connect = async () => {
  try {
    await mongoose.connect(keys.mongoURI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log("DB Connected Successfully ✅");
  } catch (error) {
    console.error("An error occurred while connecting to the database:", error);
    process.exit(1);
  }
};
