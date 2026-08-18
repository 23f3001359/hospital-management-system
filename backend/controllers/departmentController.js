const Department = require('../models/Department');
const Doctor = require('../models/Doctor');

// POST /api/departments
exports.createDepartment = async (req, res) => {
  try {
    const { name, overview } = req.body;

    if (!name) {
      return res.status(400).json({ message: 'Department name is required' });
    }

    const existing = await Department.findOne({ name });
    if (existing) {
      return res.status(409).json({ message: 'Department already exists' });
    }

    const department = await Department.create({ name, overview });
    return res.status(201).json(department);
  } catch (error) {
    return res.status(500).json({ message: 'Could not create department', error: error.message });
  }
};

// GET /api/departments
exports.getAllDepartments = async (req, res) => {
  try {
    const departments = await Department.find({ isActive: true }).sort({ name: 1 });
    return res.status(200).json(departments);
  } catch (error) {
    return res.status(500).json({ message: 'Could not fetch departments', error: error.message });
  }
};

// GET /api/departments/:id
// Returns the department along with its doctors (matches "view details" in your wireframe)
exports.getDepartmentById = async (req, res) => {
  try {
    const department = await Department.findById(req.params.id);

    if (!department) {
      return res.status(404).json({ message: 'Department not found' });
    }

    const doctors = await Doctor.find({ department: department._id }).select(
      'fullName specialization experienceYears'
    );

    return res.status(200).json({ ...department.toObject(), doctors });
  } catch (error) {
    return res.status(500).json({ message: 'Could not fetch department', error: error.message });
  }
};

// PUT /api/departments/:id
exports.updateDepartment = async (req, res) => {
  try {
    const department = await Department.findByIdAndUpdate(
      req.params.id,
      { name: req.body.name, overview: req.body.overview },
      { new: true, runValidators: true }
    );

    if (!department) {
      return res.status(404).json({ message: 'Department not found' });
    }

    return res.status(200).json(department);
  } catch (error) {
    return res.status(400).json({ message: 'Could not update department', error: error.message });
  }
};

// DELETE /api/departments/:id
// Soft-delete preferred, since doctors/appointments reference this department
exports.deleteDepartment = async (req, res) => {
  try {
    const department = await Department.findByIdAndUpdate(
      req.params.id,
      { isActive: false },
      { new: true }
    );

    if (!department) {
      return res.status(404).json({ message: 'Department not found' });
    }

    return res.status(200).json({ message: 'Department deactivated', department });
  } catch (error) {
    return res.status(500).json({ message: 'Could not delete department', error: error.message });
  }
};