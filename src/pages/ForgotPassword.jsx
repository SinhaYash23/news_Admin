import React, { useState } from 'react';
import axios from '../api/axios';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const ForgotPassword = () => {
    const [email, setEmail] = useState('');
    const [otp, setOtp] = useState('');
    const [newPassword, setNewPassword] = useState('');
    const [otpSent, setOtpSent] = useState(false);
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();

    const handleOtp = async () => {
        if (!email) {
            toast.warn('Please enter your email.');
            return;
        }
        setOtpSent(true);
        toast.success('OTP has been sent to your email.');
    };

    const handleResetPassword = async () => {
        if (!email || !otp || !newPassword) {
            toast.error('All fields are mandatory');
            return;
        }
        setLoading(true);
        try {
            const response = await axios.post('https://api.yashsinha.online/api/auth/forgot-password', {
                email,
                otp,
                newPassword,
            });

            if (response.data.success) {
                toast.success('Password reset successfully!');
                setTimeout(() => {
                    navigate('/login');
                }, 1500);
            } else {
                toast.error(response.data.message || 'Failed to reset password');
            }
        } catch (error) {
            console.error('Reset Error:', error);
            toast.error(error.response?.data?.message || 'Something went wrong');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-gradient-to-r from-blue-100 to-purple-100 p-4">
            <motion.div
                initial={{ opacity: 0, y: 40 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, ease: 'easeOut' }}
                className="bg-white shadow-lg rounded-lg p-8 w-full max-w-md"
            >
                <h2 className="text-2xl font-bold mb-6 text-center text-gray-800">Forgot Password</h2>

                <input
                    type="email"
                    placeholder="Enter your email"
                    className="w-full p-3 border border-gray-300 rounded mb-4 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    disabled={otpSent}
                />

                {!otpSent ? (
                    <motion.button
                        whileTap={{ scale: 0.95 }}
                        onClick={handleOtp}
                        className="w-full bg-blue-600 text-white p-3 rounded hover:bg-blue-700 transition"
                    >
                        Send OTP
                    </motion.button>
                ) : (
                    <>
                        <motion.input
                            type="text"
                            placeholder="Enter OTP"
                            className="w-full p-3 border border-gray-300 rounded mb-4 focus:outline-none focus:ring-2 focus:ring-blue-500"
                            value={otp}
                            onChange={(e) => setOtp(e.target.value)}
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.2 }}
                        />
                        <motion.input
                            type="password"
                            placeholder="New Password"
                            className="w-full p-3 border border-gray-300 rounded mb-4 focus:outline-none focus:ring-2 focus:ring-blue-500"
                            value={newPassword}
                            onChange={(e) => setNewPassword(e.target.value)}
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.3 }}
                        />
                        <motion.button
                            whileTap={{ scale: 0.95 }}
                            onClick={handleResetPassword}
                            disabled={loading}
                            className={`w-full p-3 rounded text-white transition ${
                                loading
                                    ? 'bg-gray-400 cursor-not-allowed'
                                    : 'bg-green-600 hover:bg-green-700'
                            }`}
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.4 }}
                        >
                            {loading ? 'Resetting...' : 'Reset Password'}
                        </motion.button>
                    </>
                )}
            </motion.div>

            {/* Toast Container */}
            <ToastContainer position="top-right" autoClose={3000} hideProgressBar={false} />
        </div>
    );
};

export default ForgotPassword;
