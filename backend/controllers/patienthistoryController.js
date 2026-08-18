const { populate } = require('../models/doctor');
const PatientHistory = require('../models/PatientHistory');

exports.getAllPatientHistories = async (req, res)=>{
    const histories = await PatientHistory.find().populate({
        path: 'appointment',
        populate: [
            {
                path: 'patient',
                select: 'fullName age gender contact',
            },
            {
                path: 'doctor',
                select: 'fullName specialization',
            },
            {
                path: 'department',
                select: 'name',
            },
        ]
    }).sort({ createdAt: -1 }),
    }
    return res.status(200).json(histories);

exports.getPatientHistoryById = async (req, res) =>{
    const histories = await PatientHistory.find({
    patient: req.params.patientId
    });

    if (!histories) {return res.status(304).json({"message":"No history found"})};
    
}