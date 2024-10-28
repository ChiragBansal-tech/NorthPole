import React, { useState } from "react";
import { useNavigate, useParams } from 'react-router-dom';
import axios from 'axios'
import SignInLayout from "../SignuoLayout";

const OtpPage = () => {
    const [otp , setOtp] = useState('');
    const [error, setError] = useState('');
    const { userId } = useParams();
    const navigate = useNavigate();

    const handleOtpSubmit = async() => {
        try{
            const response = await axios.post('http://localhost:8005/user/verify-otp',{ userId, otp});

            if(response.status === 200){
                navigate('/login');
            }
        }
        catch(error){
            setError(error.response?.data?.message || 'OTP verification failed');
        }
    };
    return(
        <SignInLayout>
            <div>
                <h1>Enter OTP</h1>
                <input
                    type="text"
                    value={otp}
                    onChange={(e) => setOtp(e.target.value)}
                    placeholder="Enter the OTP"
                />
                <button onClick={handleOtpSubmit}>Verify OTP</button>
                {error && <p className="text-red-500">{error}</p>}
            </div>
        </SignInLayout>
    )
}
export  default OtpPage;