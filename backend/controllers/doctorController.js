const Doctor = require('../models/Doctor');
const User = require('../models/User')

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
	try{
		const { username,
			password,
			fullName,
			department,
			specialization,
			experienceYears,
			degree,
			bio } = req.body;

		if (!username || !password) {
			return res.status(404).json({ message: "No username or password provided" });
		}
		if (!fullName || !department || !specialization || !experienceYears || !degree || !bio) {
			return res.status(404).json({ message: "Please fill in all the details" })
		}

		const existingUser = await User.findOne({ username });
		console.log(existingUser);
		if (existingUser) {
			return res.status(409).json({ message: "Username already taken muaahaha" });
		}

		const user = await User.create({ username, password, role: "doctor" });
		const doctor = await Doctor.create({
			user: user._id,
			fullName,
			department,
			specialization,
			experienceYears,
			degree,
			bio
		});
		res.status(201).json(doctor);
	}catch(error){
		return(res.json({message: error.message}));
	}
};

exports.updateDoctor = async (req, res) => {
	if (req.user.id !== req.params.id && req.user.role !== "admin"){
		return res.status(409).json({message: "You can update only your own data"});
	}
	try{
		const doctor = await Doctor.findOneAndUpdate({user: req.params.id}, req.body, { new: true });
		return res.status(200).json(doctor);
	}catch(error){
		return res.json({"Update failed":error.message});
	}	
	res.json(doctor);
};

exports.deleteDoctor = async (req, res) => {
	await Doctor.findByIdAndDelete(req.params.id);
	res.json({ message: 'Doctor deleted' });
};