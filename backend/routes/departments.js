const express = require('express');
const router = express.Router();

const {
  createDepartment,
  getAllDepartments,
  getDepartmentById,
  updateDepartment,
  deleteDepartment,
} = require('../controllers/departmentController');

const {protect, authorizeRoles} = require('../middleware/auth');

router.get('/', getAllDepartments);
router.get('/:id', getDepartmentById);
router.post('/', protect, createDepartment);
router.put('/:id', protect, updateDepartment);
router.delete('/:id', protect, deleteDepartment);

module.exports = router;