const express = require('express');
const router = express.Router();
const { createAvailability, getAllAvailability , getShift } = require('../controllers/userController')

const userPage = (req, res) => {
  res.status(200).json({ message: 'User page' });
};

router.get('/user-page', userPage);
router.post('/createavailability', createAvailability);
router.get('/availability' ,getAllAvailability );
router.get('/shifts', getShift);

module.exports = router;
