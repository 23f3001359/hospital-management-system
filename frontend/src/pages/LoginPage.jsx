import { useEffect, useState } from "react";
import './LoginPage.css'
// import loginImage from "../assets/login_image.png";
import loginImage from "../assets/medismart_login.jpg"

export default function LoginPage() {
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
                <div className="form-floating mb-3" style={{ width: '75%' }}>
                    <input type="email" className="form-control" id="floatingInput" placeholder="name@example.com" style={{ borderRadius: '15px' }} />
                    <label for="floatingInput">Email address</label>
                </div>
                <div className="form-floating" style={{ width: '75%' }}>
                    <input type="password" className="form-control" id="floatingPassword" placeholder="Password" style={{ borderRadius: '15px' }} />
                    <label for="floatingPassword">Password</label>
                </div>
                <div style={{display: 'flex', marginTop: '5%', alignItems: 'center', width: '75%', justifyContent:'space-between'}}>
                    <button type="button" className="btn btn-primary" style={{borderRadius: '15px', width: '40%'}}>Sign In</button>
                    <p style={{margin: 0}}>Create an account?</p>
                </div>
                
            </div>

        </div>
    );
}

// export default LoginPage