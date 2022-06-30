import React, { useState } from 'react'
import { FaEnvelope, FaLock, FaUserAlt } from 'react-icons/fa';
import axios from 'axios';
import { useDispatch } from 'react-redux';
import { userAction } from '../redux/userSlice';
import { Link, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';

const Signup = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');

    // const [ register, { isLoading}] = useRegisterMutation();

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            if(password !== confirmPassword) return toast.error("Password do not match");
            const {data } = await axios.post('/api/user/register', {
                username,
                email,
                password
            });
            dispatch(userAction.register({user: data}));
            console.log(data);
            navigate('/login');
        } catch (err) {
            console.log(err.message);
        }
    };

  return (
    <div className='min-h-full flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8'>
        <div className='max-w-md w-full space-y-8'>
            <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
                <div className="rounded-md shadow-sm -space-y-px">

                    <div className='mb-1 duration-500 hover:bg-purple-500 flex items-center w-full border border-gray-300 text-gray-900 rounded-t-md pointer-events-none'>
                        <FaUserAlt className='mx-3' />
                        <input value={username} onChange={(e) => setUsername(e.target.value)} name="username" type="text" autoComplete="current-name" required className="w-full px-3 focus:outline-indigo-500 py-2 pointer-events-auto border-indigo-500 focus:z-10 sm:text-sm" placeholder="Name"/>
                    </div>

                    <div className='mb-1 duration-500 hover:bg-purple-500 flex items-center w-full border border-gray-300 text-gray-900 pointer-events-none'>
                        <FaEnvelope className='mx-3' />
                        <input value={email} onChange={(e) => setEmail(e.target.value)} name="email" type="email" autoComplete="email" required className="w-full px-3 focus:outline-indigo-500 py-2 pointer-events-auto border-indigo-500 focus:z-10 sm:text-sm" placeholder="Email address"/>
                    </div>
                    <div className='mb-1 duration-500 hover:bg-purple-500 flex items-center w-full border border-gray-300 text-gray-900 pointer-events-none'>
                        <FaLock className='mx-3' />
                        <input value={password} onChange={(e) => setPassword(e.target.value)} name="password" type="password" autoComplete="current-password" required className="w-full px-3 focus:outline-indigo-500 py-2 pointer-events-auto border-indigo-500 focus:z-10 sm:text-sm" placeholder="Password"/>
                    </div>
                    <div className='mb-1 duration-500 hover:bg-purple-500 flex items-center w-full border border-gray-300 text-gray-900 rounded-b-md pointer-events-none'>
                        <FaLock className='mx-3' />
                        <input value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)} name="confirm-password" type="password" autoComplete="current-password" required className="w-full px-3 focus:outline-indigo-500 py-2 pointer-events-auto border-indigo-500 focus:z-10 sm:text-sm" placeholder="Confirm Password"/>
                    </div>
                </div>

                <div>
                    <button type="submit" className="w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-gradient-to-r from-purple-500 via-pink-500 to-yellow-500 hover:from-purple-600 hover:via-pink-600 hover:to-yellow-600 focus:from-purple-400 focus:via-pink-400 focus:to-yellow-400 duration-300">
                        Sign in
                    </button>
                </div>
                <p>Have an accout? <Link to="/login" className='text-blue-600 underline'>Login Here.</Link></p>
            </form>
        </div>
    </div>
  )
}

export default Signup