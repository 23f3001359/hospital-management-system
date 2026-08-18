const express = require('express');
const router = express.Router();
const {
  getAllPatients, getPatientById, createPatient, updatePatient, deletePatient,
} = require('../controllers/patientController');
const {protect, authorizeRoles} = require('../middleware/auth');

router.get('/', protect, getAllPatients);
router.get('/:id', protect, getPatientById);
router.post('/', createPatient); // registration is public per your Register Form
router.put('/:id', protect, updatePatient);
router.delete('/:id', protect, deletePatient);

module.exports = router;