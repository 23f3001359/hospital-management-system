const express = require('express');
const router = express.Router();
const {
  getAllDoctors, getDoctorById, createDoctor, updateDoctor, deleteDoctor,
} = require('../controllers/doctorController');
const {protect, authorizeRoles} = require('../middleware/auth');

router.get('/', getAllDoctors);
router.get('/:id', getDoctorById);
router.post('/', protect, createDoctor);
router.put('/:id', protect, updateDoctor);
router.delete('/:id', protect, deleteDoctor);

module.exports = router;