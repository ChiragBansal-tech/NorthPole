import React, { useState } from "react";
import { useFormik } from "formik"; 
import InputCompo from "../Components/InputComp";
import ButtonCompo from "../Components/ButtonComp";
import SignInLayout from "../SignuoLayout";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const Signup = () => {
    const [passwordVisible, setPasswordVisible] = useState(false); 
    const [loading, setLoading] = useState(false); 
    const navigate = useNavigate();
   
    const formik = useFormik({
        initialValues: {
            firstName: '',
            lastName: '',
            email: '',
            password: '',
            address: '',
            phoneNo: '',
        },
        onSubmit: async (values) => {
            setLoading(true);
            try {
                
                const response = await axios.post("http://localhost:3000/user/signup", {
                    firstName: values.firstName,
                    lastName: values.lastName,
                    email: values.email,
                    password: values.password,
                    address: values.address,
                    phoneNo: values.phoneNo,
                });

                if (response.status === 200) {
                    navigate('/login');
                } else {
                    alert("Signup failed. Please try again.");
                }
            } catch (error) {
                console.error("Signup error:", error);
                alert("An error occurred during signup. Please try again.");
            } finally {
                setLoading(false);
            }
        },
    });

    return(
        <div className="grid grid-cols-1">
            <SignInLayout>
            <div className="flex flex-col justify-center items-center ">
                <form onSubmit={formik.handleSubmit} className="mx-auto max-w-7xl px-2 sm:px-6 lg:px-8">
                    <div className="flex flex-cols gap-5">
                        <InputCompo
                            inputLabel='First Name'
                            type='text'
                            name='firstName'
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                            value={formik.values.firstName}
                            placeholder='' 
                        />
                        <InputCompo
                            inputLabel='Last Name'
                            type='text'
                            name='lastName'
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                            value={formik.values.lastName}
                            placeholder='' 
                        />
                    </div>
                    <InputCompo
                        inputLabel='Email'
                        type='email'
                        name='email'
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        value={formik.values.email}
                        placeholder='' 
                    />
                    <InputCompo
                        inputLabel='Password'
                        type={passwordVisible ? 'text' : 'password'}
                        name='password'
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        value={formik.values.password}
                        placeholder=''
                    />
                    <button
                        type="button"
                        onClick={() => setPasswordVisible(!passwordVisible)}
                        className="text-sm text-blue-500"
                    >
                        {passwordVisible ? "Hide Password" : "Show Password"}
                    </button>
                    <InputCompo
                        inputLabel='Address'
                        type='text'
                        name='address'
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        value={formik.values.address}
                        placeholder='' 
                    />
                    <InputCompo
                        inputLabel='Phone No.'
                        type='text'
                        name='phoneNo'
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        value={formik.values.phoneNo}
                        placeholder='' 
                    />
                    <ButtonCompo
                        value={loading ? 'Creating...' : 'Create Account'}
                        type='submit'
                        className='bg-Metal60 text-white w-full p-2 my-2 rounded-[5px] border-2  border-Metal60 hover:bg-white hover:border-Metal60 hover:text-Metal60 hover:font-medium'
                    />
                </form>    
            </div>
            </SignInLayout>
        </div>
    );
}

export default Signup;
