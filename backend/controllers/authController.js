const jwt = require('jsonwebtoken');
const Patient = require('../models/Patient');
const User = require('../models/User');

const generateToken = (user) => {
  return jwt.sign(
    {
      id: user._id,
      role: user.role,
    },
    process.env.JWT_SECRET,
    {
      expiresIn: '7d',
    }
  );
};

exports.register = async (req, res) =>{
    try{
        const {
            username,
            password,
            fullName,
            age,
            gender,
            contact,
        } = req.body;

        if (!username || !password || !fullName || !age || !gender || !contact) {
            return res.status(400).json({
                message: "Username, Password, Full Name, Age, Gender, Contact"
            });
        }

        const existingUser = await User.findOne({username});
        
        if (existingUser){
            return res.status(409).json({
                message: "Username already taken."
            });
        }

        const user = await User.create({
            username,
            password,
            role: 'patient',
        });

        const patient = await Patient.create({
            user: user._id,
            fullName,
            age,
            gender,
            contact,
        });

        const token = generateToken(user);

        return res.status(201).json({
            message: 'Patient created successfully.',
            token,
            user: {
                id: user._id,
                user: user.username,
                role: user.role,
            },
            patient: {
                id: patient._id,
                fullName: patient.fullName,
            },
        });
    }catch(error){
    return res.status(500).json({
        message: 'Patient registration failed',
        error: error.message,
    });
    }}

exports.login = async (req, res)=>{
    try{
        const {username, password} = req.body;

        if (!username || !password){
            return res.status(400).json({
                message: 'Username and Password are required'
            });
        }

        const user = await User.findOne({username});

        if (!user){
            return res.status(400).json({
                message: 'Invalid username'
            });
        }

        if (user.isBlacklisted) {return res.status(403).json({message: 'Account is blacklisted'})}

        const isMatch = await user.comparePassword(password);
        // console.log(isMatch);        

        if (!isMatch) {return res.status(401).json({message: 'Invalid Password'})}

        const token = generateToken(user);

        let profile = null;
        if (user.role === 'patient') {
        profile = await Patient.findOne({ user: user._id });
        }

        return res.status(200).json({
            message: 'Login successful',
            token,
            user: {
                id: user._id,
                username: user.username,
                role: user.role,
            },
            profile,
        });

    } catch(error){
        return res.status(500).json({
            message: 'Login Failed',
            error: error.message,
        });
    }
}