const mongoose = require('mongoose');
const dev = require('.')
const connectToMongoDB = async () => {
  try {
    await mongoose.connect(dev.db.url);
    console.log('Connected to MongoDB');
  } catch (error) {
    console.error('Error connecting to MongoDB:', error);
    process.exit(1);
  }
};

module.exports = connectToMongoDB;

