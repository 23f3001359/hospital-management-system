const User = require("../models/User");
const bcrypt = require('bcryptjs');

const ensureAdmin = async ()=>{
    try{
        const checkAdmin = await User.findOne({role: "admin"});
        if (checkAdmin){
            console.log("Admin already exists");
            return
        }
        const hash = await bcrypt.genSalt(10);
        const hashed = await bcrypt.hash("admin123", hash);
        User.create({
            username: "admin",
            password: hashed,
            role: "admin"
        });
        console.log("Default admin user created");
    }catch(error){
        console.log("Error creating admin:", error.message);
    }
}

module.exports = ensureAdmin;