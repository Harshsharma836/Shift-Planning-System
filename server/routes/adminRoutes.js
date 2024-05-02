const express = require('express');
const router = express.Router();
const { getEmployees, getEmployeeAvailability, createShift } = require('../controllers/adminController');

const adminPage = (req, res) => {
  res.status(200).json({ message: 'Admin page' });
};

router.get('/admin-page', adminPage);
router.get('/employees', getEmployees);
router.get('/availability/:userId', getEmployeeAvailability);
router.post('/shifts', createShift);

module.exports = router;
