const User = require('../models/User');
const jwt = require('jsonwebtoken');
const Availability = require('../models/Availability');
const Shift = require('../models/Shift')

const getAllAvailability = async (req, res) => {
  if (!req.user) {
    return res.status(400).json({ message: 'Please Login First' });
  }
  try {
    const availabilities = await Availability.find({userId : req.user.userId});
    res.json(availabilities);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

const createAvailability  = async (req, res) => {
    if (!req.user) {
      return res.status(400).json({ message: 'Please Login First' });
    }

    const availability = new Availability({
        date: req.body.date,
        startTime: req.body.startTime,
        endTime: req.body.endTime,
        timezone: req.body.timezone,
        userId: req.user.userId,
      });
    
      try {
        const newAvailability = await availability.save();
        res.status(201).json(newAvailability);
      } catch (err) {
        res.status(400).json({ message: err.message });
      }
};

const getShift = async (req,res) => {
  try {
    if (!req.user) {
      return res.status(400).json({ message: 'Please Login First' });
    }
    const userId = req.user.userId;

    const shifts = await Shift.find({ userId });
    res.json(shifts);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
}


module.exports = { createAvailability , getAllAvailability, getShift};
