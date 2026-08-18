const Appointment = require('../models/Appointment');

exports.getAppointments = async (req, res) => {
  const appointments = await Appointment.find().populate('patient doctor department');
  res.json(appointments);
};

exports.createAppointment = async (req, res) => {
  const { doctor, date, timeSlot } = req.body;
  const conflict = await Appointment.findOne({ doctor, date, timeSlot, status: 'scheduled' });
  if (conflict) return res.status(409).json({ message: 'Slot already booked' });

  const appointment = await Appointment.create(req.body);
  res.status(201).json(appointment);
};

exports.updateAppointmentStatus = async (req, res) => {
  const { status } = req.body; // 'completed' or 'cancelled'
  const appointment = await Appointment.findByIdAndUpdate(req.params.id, { status }, { new: true });
  res.json(appointment);
};

exports.cancelAppointment = async (req, res) => {
  await Appointment.findByIdAndUpdate(req.params.id, { status: 'cancelled' });
  res.json({ message: 'Appointment cancelled' });
};