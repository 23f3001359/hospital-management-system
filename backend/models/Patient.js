const mongoose = require('mongoose');

const patientSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  fullName: { type: String, required: true },
  age: Number,
  gender: String,
  contact: String,
  // assignedDoctor: { type: mongoose.Schema.Types.ObjectId, ref: 'Doctor' },
}, { timestamps: true });

module.exports = mongoose.model('Patient', patientSchema);

// const mongoose = require('mongoose');

// const patientSchema = new mongoose.Schema(
//   {
//     fullName: { type: String, required: true },
//     age: { type: Number, required: true },
//     gender: { type: String, required: true },
//     contact: { type: String, required: true }
//   },
//   { timestamps: true }
// );

// module.exports = mongoose.model('Patient', patientSchema);