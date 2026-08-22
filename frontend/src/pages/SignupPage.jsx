import { useEffect, useState } from "react";
import './SignupPage.css'
import loginImage from "../assets/medismart_login.jpg"
import { useNavigate } from 'react-router-dom';
import axios from "axios";
import { Link } from "react-router-dom";

export default function SignupPage() {
    const navigate = useNavigate();

    const [formData, setFormData] = useState({
        username: "",
        password: "",
        fullName: "",
        age: "",
        gender: "",
        contact: ""
    })
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);

    const handleChange = (e) => {
        setFormData({...formData, [e.target.name]: e.target.value});
    };

    const handleSubmit = async (e)=>{
        e.preventDefault();
        setError('');
        setLoading(true);

        try{
            const response = await axios.post(
                "http://localhost:5000/api/auth/register",
                {
                    username: formData.username,
                    password: formData.password,
                    fullName: formData.fullName,
                    age: formData.age,
                    gender: formData.gender,
                    contact: formData.contact
                }
            );
            const {token, user} = response.data;

            localStorage.setItem("token",token);
            localStorage.setItem("user", JSON.stringify(user));
            navigate("/patient/home");
        } catch (err) {
            const message =
                err.response?.data?.message || "Registration failed. Please check your credentials.";
            setError(message);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div style={{ display: 'flex', width: '100vw', height: '100vh', margin: 0 }}>
            {/* Left Side: Image Container */}
            <div style={{ width: '50%', backgroundColor: '#f0f0f0' }}>
                {/* Add your img tag or background graphic here */}
                <img src={loginImage} alt=""
                    style={{
                        width: '100%',
                        height: '100%',
                        objectFit: 'cover'
                    }} />
            </div>

            {/* Right Side: Login Form Container */}
            <div style={{
                width: '50%',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                flexDirection: 'column',
                alignItems: 'center'
            }}>
                <div className="create-account">
                    Create Account
                </div>
                {error && (
    <div className="alert alert-danger" style={{ width: '75%', marginBottom: '3%' }}>
        {error}
    </div>
)}
                <div className="form-floating mb-3" style={{ width: '75%' }}>
                    <input type="email" 
                    className="form-control" 
                    id="floatingInput" 
                    placeholder="name@example.com" 
                    style={{ borderRadius: '15px' }}
                    onChange={handleChange}
                    name="username" 
                    />
                    <label htmlFor="floatingInput">Username</label>
                </div>
                <div className="form-floating mb-3" style={{ width: '75%' }}>
                    <input type="text" 
                    className="form-control" 
                    id="floatingInput" 
                    placeholder="name@example.com" 
                    style={{ borderRadius: '15px' }}
                    onChange={handleChange}
                    name="fullName" 
                    />
                    <label htmlFor="floatingInput">Full Name</label>
                </div>
                <div className="form-floating mb-3" style={{ width: '75%' }}>
                    <input type="password" 
                    className="form-control" 
                    id="floatingPassword" 
                    placeholder="Password" 
                    style={{ borderRadius: '15px' }}
                    onChange={handleChange} 
                    required
                    name="password"
                    />
                    <label htmlFor="floatingPassword">Password</label>
                </div>
                <div className="form-floating mb-3" style={{ width: '75%' }}>
                    <input type="password" 
                    className="form-control" 
                    id="floatingPassword" 
                    placeholder="Password" 
                    style={{ borderRadius: '15px' }} 
                    required
                    name="confirmpassword"
                    />
                    <label htmlFor="floatingPassword">Confirm Password</label>
                </div>
                <div style={{display: 'flex', width: '75%', justifyContent: 'space-between'}}>
                    <div className="form-floating mb-3" style={{ width: '47.5%' }}>
                        <input type="number"
                            className="form-control"
                            id="floatingText"
                            placeholder="Age"
                            style={{ borderRadius: '15px' }}
                            onChange={handleChange}
                            required
                            name="age"
                        />
                        <label htmlFor="floatingInput">Age</label>
                    </div>
                    <div className="form-floating mb-3" style={{ width: '47.5%' }}>
                        <input type="text"
                            className="form-control"
                            id="floatingText"
                            placeholder="Gender"
                            style={{ borderRadius: '15px' }}
                            onChange={handleChange}
                            required
                            name="gender"
                        />
                        <label htmlFor="floatingInput">Gender</label>
                    </div>
                </div>
               
                <div className="form-floating mb-3" style={{ width: '75%' }}>
                    <input type="text" 
                    className="form-control" 
                    id="floatingText" 
                    placeholder="Contact" 
                    style={{ borderRadius: '15px' }}
                    onChange={handleChange} 
                    required
                    name="contact"
                    />
                    <label htmlFor="floatingInput">Contact</label>
                </div>


                <div style={{display: 'flex', marginTop: '5%', alignItems: 'center', width: '75%', justifyContent:'space-between'}}>
                    <button type="button" 
                    className="btn btn-primary" 
                    style={{borderRadius: '15px', width: '40%'}}
                    onClick={handleSubmit}
                    >Create Account</button>
                    <p style={{margin: 0}}>
                        <Link to="/">
                        Login?
                        </Link>
                    </p>
                </div>
                
            </div>

        </div>
    );
}

// export default LoginPage