import React from 'react'
import { useState } from 'react'
import axios from '../api/axios'
import { useNavigate } from 'react-router-dom'

const ForgotPassword = () => {


    const [email, setEmail] = useState('');
    const [otp, setOtp] = useState('');
    const [newPassword, setNewPassword] = useState('');
    const [otpSent, setOtpSent] = useState(false);
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();

    // Step 1: Sending Otp
    const handleOtp = async ()=> {
        if (!email) return alert('Please enter your email.');
        setOtpSent(true);
        alert('OTP has been sent to your email.')
    };

    // Step 2: Verfiy OTP + Reset Password
    const handleResetPassword = async ()=>{
        if (!email || !otp || !newPassword){
            alert('All fields are mandatory');
            return;
        }
        setLoading(true);
        try{
            const response = await axios.post('https://api.yashsinha.online/api/auth/forgot-password', {
                email,
                otp,
                newPassword
            });
            if (response.data.success){
                alert('Password reset successfully');
                navigate('/login');
            }else{
                alert(response.data.message || "Failed to reset password");
            }
        }catch(error){
            console.error('Reset Error:', error);
            alert(error.response?.data?.message || 'Something went wrong');
        }finally{
            setLoading(false);
        }
    };

  return (
    <div>
        <div>
            <div>
                <h2>Forgot Password</h2>

                <input 
                type="email"
                placeholder='Enter your email' 
                className='w-full p-2 border rounded mb-3'
                value={email}
                onChange={(e)=>setEmail(e.target.value)}
                disabled={otpSent}/>

                {!otpSent ? (
                    <button
                        onClick={handleOtp}
                        className='w-full bg-blue-600 text-white p-2 rounded hover:bg-blue-700'
                    >
                        Send OTP
                    </button>
                ):(
                    <>
                        <input
                        type="text"
                        placeholder="Enter OTP"
                        className="w-full p-2 border rounded mb-3"
                        value={otp}
                        onChange={(e) => setOtp(e.target.value)}
                    />
                        <input
                        type="password"
                        placeholder="New Password"
                        className="w-full p-2 border rounded mb-3"
                        value={newPassword}
                        onChange={(e) => setNewPassword(e.target.value)}
                    />
                        <button
                        onClick={handleResetPassword}
                        disabled={loading}
                        className="w-full bg-green-600 text-white p-2 rounded hover:bg-green-700"
                    >
                        {loading ? "Resetting..." : "Reset Password"}
                        </button>
                    </>
                )}
            </div>
        </div>
    </div>
  )
}

export default ForgotPassword