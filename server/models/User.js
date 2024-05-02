const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  email: { type: String, unique: true },
  password: String,
  role: { type: String, enum: ['user', 'admin'], default: 'user' },
  timeZone: { type: String, default: null }, // Optional timeZone field

});

const User = mongoose.model('User', userSchema);

module.exports = User;
