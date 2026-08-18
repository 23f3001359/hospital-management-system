const express = require('express');
const router = express.Router();
const {
  getAppointments, createAppointment, updateAppointmentStatus, cancelAppointment,
} = require('../controllers/appointmentController');
const {protect, authorizeRoles} = require('../middleware/auth');

router.get('/', protect, getAppointments);
router.post('/', protect, createAppointment);
router.put('/:id/status', protect, updateAppointmentStatus);
router.put('/:id/cancel', protect, cancelAppointment);

module.exports = router;