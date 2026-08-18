const mongoose = require('mongoose');

const departmentSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      unique: true,
      trim: true,
    }, // e.g. "Cardiology", "Oncology", "General"

    overview: {
      type: String,
      default: '',
      trim: true,
    }, // matches the "Department of Oncology" description text in your wireframe

    isActive: {
      type: Boolean,
      default: true,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model('Department', departmentSchema);