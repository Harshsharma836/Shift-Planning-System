const Availability = require('../models/Availability');
const User = require('../models/User');
const { DateTime } = require('luxon');
const Shift = require('../models/Shift')

const getEmployees = async (req, res) => {
  try {
    const employees = await User.find({ role: 'user' });
    res.json({ employees });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const getEmployeeAvailability = async (req, res) => {
 
  const userId = req.params.userId;
  if (!userId) {
    return res.status(400).json({ message: 'userId is required' });
  }

  try {
    const availability = await Availability.find({ userId });
    res.json({ availability });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const createShift = async (req, res) => {
  try {

    /*
        date,
        startTime,
        endTime,
        timezone,
        employeeId: selectedEmployee,
    */
    const { date, startTime, endTime, timezone , employeeId} = req.body;
    console.log({date, startTime, endTime, timezone , employeeId})
    // Fetch admin's timezone
    const admin = await User.findOne({_id : req.user.userId});

    if (admin.timezone === null) {
      admin.timezone = "IST"; 
      await admin.save();
    }

    // Convert time to admin's timezonee
    const startDateTime = DateTime.fromISO(`${date}T${startTime}`, { zone: req.body.timezone }).setZone(admin.timeZone);
    const endDateTime = DateTime.fromISO(`${date}T${endTime}`, { zone: req.body.timezone }).setZone(admin.timeZone);

    // Check for overrllapping shifts
    const existingShifts = await Shift.find({
      date,
      $or: [
        { startTime: { $lt: startDateTime.toISOTime() }, endTime: { $gt: startDateTime.toISOTime() } },
        { startTime: { $lt: endDateTime.toISOTime() }, endTime: { $gt: endDateTime.toISOTime() } },
        { startTime: { $gte: startDateTime.toISOTime() }, endTime: { $lte: endDateTime.toISOTime() } },
      ],
    });

    if (existingShifts.length > 0) {
      return res.status(400).json({ message: 'Shift overlaps with existing shift' });
    }
    // Save the shift with the converted time
    const shift = new Shift({
      date,
      startTime: startDateTime.toISOTime(),
      endTime: endDateTime.toISOTime(),
      timezone: admin.timeZone,
      userId : employeeId,
    });

    await shift.save();
    res.status(201).json({ message: 'Shift created successfully' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server Error' });
  }
};

module.exports = { getEmployees, getEmployeeAvailability, createShift };
