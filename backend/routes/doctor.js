const express = require('express');
const router = express.Router();
const {
  getAllDoctors, getDoctorById, createDoctor, updateDoctor, deleteDoctor,
} = require('../controllers/doctorController');
const {protect, authorizeRoles} = require('../middleware/auth');

router.get('/', getAllDoctors);
router.get('/:id', getDoctorById);
router.post('/', protect, authorizeRoles("admin"), createDoctor);
router.put('/:id', protect, authorizeRoles("admin","doctor"), updateDoctor);
router.delete('/:id', protect, authorizeRoles("admin"), deleteDoctor);

module.exports = router;