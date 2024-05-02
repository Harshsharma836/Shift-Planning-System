const mongoose = require('mongoose');

const timezoneEnum = ['GMT', 'IST', 'EST', 'PST']; // Example list of timezones

const shiftSchema = new mongoose.Schema({
  date: { type: Date, required: true },
  startTime: { type: String, required: true },
  endTime: { type: String, required: true },
  timezone: { type: String, enum: timezoneEnum, required: true },
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
});

const Shift = mongoose.model('Shift', shiftSchema);

module.exports = Shift;
