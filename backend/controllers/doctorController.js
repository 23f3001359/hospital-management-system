const Doctor = require('../models/Doctor');

exports.getAllDoctors = async (req, res) => {
  const doctors = await Doctor.find().populate('department');
  res.json(doctors);
};

exports.getDoctorById = async (req, res) => {
  const doctor = await Doctor.findById(req.params.id).populate('department assignedPatients');
  if (!doctor) return res.status(404).json({ message: 'Doctor not found' });
  res.json(doctor);
};

exports.createDoctor = async (req, res) => {
  const doctor = await Doctor.create(req.body);
  res.status(201).json(doctor);
};

exports.updateDoctor = async (req, res) => {
  const doctor = await Doctor.findByIdAndUpdate(req.params.id, req.body, { new: true });
  res.json(doctor);
};

exports.deleteDoctor = async (req, res) => {
  await Doctor.findByIdAndDelete(req.params.id);
  res.json({ message: 'Doctor deleted' });
};