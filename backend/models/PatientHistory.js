const mongoose = require('mongoose');
const doctor = require('./doctor');

const medicineSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },
    dosage: {
      type: String,
      required: true,
      trim: true,
    }, // Example: "1-0-1"
    duration: {
      type: String,
      default: '',
      trim: true,
    }, // Example: "7 days"
    instructions: {
      type: String,
      default: '',
      trim: true,
    }, // Example: "Take after food"
  },
  { _id: false }
);

const patientHistorySchema = new mongoose.Schema(
  {
    appointment: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Appointment',
      required: true,
      unique: true,
    },

    patient: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Patient',
        required: true
    },

    doctor: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Doctor',
      required: true
    },

    visitType: {
      type: String,
      enum: ['in-person', 'online'],
      default: 'in-person',
    },

    testsDone: [{ type: String, trim: true }],

    diagnosis: {
      type: String,
      required: true,
      trim: true,
    },

    prescription: {
      type: String,
      default: '',
      trim: true,
    },

    medicines: {
      type: [medicineSchema],
      default: [],
    },

    conclusion: {
      type: String,
      default: '',
      trim: true,
    },

    doctorNotes: {
      type: String,
      default: '',
      trim: true,
    },

    followUpDate: {
      type: Date,
      default: null,
    },
  },
  { timestamps: true }
);