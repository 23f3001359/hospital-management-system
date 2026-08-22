import { useEffect, useState } from "react";
import './LoginPage.css'
// import loginImage from "../assets/login_image.png";
import loginImage from "../assets/medismart_login.jpg"
import { useNavigate } from 'react-router-dom';
import axios from "axios";
import { Link } from "react-router-dom";

export default function LoginPage() {
    const navigate = useNavigate();

    const [formData, setFormData] = useState({username: "", password: ""});
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
                "http://localhost:5000/api/auth/login",
                {
                    username: formData.username,
                    password: formData.password
                }
            );
            const {token, user} = response.data;
            localStorage.setItem("token",token);
            localStorage.setItem("user", JSON.stringify(user));
             if (user.role === "admin") navigate("/admin/home");
            else if (user.role === "doctor") navigate("/doctor/home");
            else navigate("/patient/home")
        } catch (err) {
            const message =
                err.response?.data?.message || "Login failed. Please check your credentials.";
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
                <div className="welcome">
                    Welcome Back
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
                <div className="form-floating" style={{ width: '75%' }}>
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
                <div style={{display: 'flex', marginTop: '5%', alignItems: 'center', width: '75%', justifyContent:'space-between'}}>
                    <button type="button" 
                    className="btn btn-primary" 
                    style={{borderRadius: '15px', width: '40%'}}
                    onClick={handleSubmit}
                    >Sign In</button>
                    <p style={{margin: 0}}>
                        <Link to="/signup">
                        Create an account?
                        </Link>
                    </p>
                </div>
                
            </div>

        </div>
    );
}

// export default LoginPage