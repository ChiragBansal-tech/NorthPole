import React, { useState } from "react";
import { useFormik } from 'formik'; 
import SignInLayout from "../SignuoLayout";
import InputCompo from "../Components/InputComp";
import ButtonCompo from "../Components/ButtonComp";
import axios from 'axios'; 
import { useNavigate } from 'react-router-dom';
import { useDispatch } from "react-redux";
import { setUser } from '../redux/userSlice'

const Login = () => {
    const [passwordVisible, setPasswordVisible] = useState(false);
    const [loading, setLoading] = useState(false); 
    const [error, setError] = useState(''); 
    const navigate = useNavigate(); 
    const dispatch = useDispatch();

    const formik = useFormik({
        initialValues: {
            email: '',
            password: ''
        },
        validate: (values) => {
            const errors = {};
            if (!values.email) {
                errors.email = 'Email cannot be empty';
            }
            if (!values.password) {
                errors.password = 'Password cannot be empty';
            }
            return errors;
        },
        onSubmit: async (values) => {
            setLoading(true);
            setError('');
            try {
                const response = await axios.post('http://localhost:3000/user/login', {
                    email: values.email,
                    password: values.password
                });


                if (response.data) {
                    localStorage.setItem('token', response.data.token); 
                    localStorage.setItem('user', JSON.stringify(response.data.user));

                    dispatch(setUser(response.data.user));

                    const role = response.data.user.role;
                    if(role === 'admin'){
                        navigate('/adminDashboard')
                    }
                    else if(role === 'user'){
                        navigate('/dashboard');
                    }
                }
            } catch (error) {
                setError(error.response?.data?.message || 'Login failed. Please try again.');
            } finally {
                setLoading(false);
            }
        }
    });

    const togglePasswordVisibility = () => {
        setPasswordVisible(!passwordVisible);
    };

    return (
        <div className="grid grid-cols-1">
            <SignInLayout>
                <div className="flex flex-col justify-center items-center mt-20">
                    <form onSubmit={formik.handleSubmit} className="mx-auto max-w-7xl px-2 sm:px-6 lg:px-8">
                        <InputCompo
                            inputLabel='Email'
                            type='email'
                            name='email'
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                            value={formik.values.email}
                            placeholder='Enter your email'
                        />
                        {formik.touched.email && formik.errors.email && (
                            <p className="text-red-500 text-sm">{formik.errors.email}</p>
                        )}

                        <InputCompo
                            inputLabel='Password'
                            type={passwordVisible ? 'text' : 'password'}
                            name='password'
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                            value={formik.values.password}
                            placeholder='Enter your password'
                        />
                        {formik.touched.password && formik.errors.password && (
                            <p className="text-red-500 text-sm">{formik.errors.password}</p>
                        )}

                        <span
                            className="cursor-pointer text-sm"
                            onClick={togglePasswordVisibility}
                        >
                            {passwordVisible ? 'Hide' : 'Show'} Password
                        </span>

                        {error && <p className="text-red-500 text-sm mt-2">{error}</p>}

                        <ButtonCompo
                            value={loading ? 'Logging in...' : 'Log In'}
                            type='submit'   
                            className='bg-gray-600 text-white w-full p-2 my-2 rounded-[5px] border-2 border-gray-600 hover:bg-white hover:border-gray-800 hover:text-gray-800 hover:font-medium'
                        />

                        <p className='text-center text-xs md:text-sm lg:text-base'>
                            Don't have an account? 
                            <span
                                className='font-bold mt-1 cursor-pointer'
                                onClick={() => navigate('/signup')} 
                            >
                                Sign up
                            </span>
                        </p>
                    </form>
                </div>
            </SignInLayout>
        </div>
    );
};

export default Login;
