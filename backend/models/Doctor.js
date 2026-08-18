const mongoose = require('mongoose');

const doctorSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  fullName: { type: String, required: true },
  department: { type: mongoose.Schema.Types.ObjectId, ref: 'Department', required: true },
  specialization: String,
  experienceYears: Number,
  degree: String,
  bio: String,
  assignedPatients: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Patient' }],
}, { timestamps: true });

module.exports = mongoose.model('Doctor', doctorSchema);

// const mongoose = require('mongoose');

// const doctorSchema = new mongoose.Schema(
//   {
//     fullName: { type: String, required: true },
//     specialization: { type: String, required: true },
//     experienceYears: { type: Number, default: 0 },
//     department: { type: String, required: true }
//   },
//   { timestamps: true }
// );

// module.exports = mongoose.model('Doctor', doctorSchema);