import React, { useState } from 'react'
import { FaEnvelope, FaLock } from 'react-icons/fa';
import { useDispatch } from 'react-redux';
import { userAction } from '../redux/userSlice';
import { Link, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { socket } from '../context/appContext';
import { useGoogleLoginMutation, useLoginMutation } from '../api/userApi';
import { clientId } from '../App';
import { GoogleLogin } from 'react-google-login'

const Login = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [login, {isLoading}] = useLoginMutation();
    const [googleLogin] = useGoogleLoginMutation();

    const handleSubmit = async (e) => {
        e.preventDefault();
        if(email === "" || password === "") {
            return toast.error("Please fill all the fields.")
        }
        try {
            const data = await login({email, password}).unwrap();
            dispatch(userAction.register(data));
            localStorage.setItem('user', JSON.stringify(data));
            socket.emit('friends', data._id);
            navigate('/');
        } catch (err) {
            toast.error(err.data.message);
        }
    };

    const googleResponse = async (res) => {
        const userData = await res.profileObj;
        const data= await googleLogin({username: userData.name, email: userData.email}).unwrap();
        dispatch(userAction.register(data));
        localStorage.setItem('user', JSON.stringify(data));
        socket.emit('friends', data._id);
        navigate('/');
    }

    const handleFailure = () => {
        console.log("Error while login")
    }

  return (
    <div className='min-h-full flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8'>
        <div className='max-w-md w-full space-y-8'>
        <h1 className='font-bold'>Log into your account</h1>
            <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
                <div className="rounded-md shadow-sm -space-y-px">
                    <div className='mb-1 duration-500 hover:bg-purple-500 flex items-center w-full border border-gray-300 text-gray-900 pointer-events-none'>
                        <FaEnvelope className='mx-3' />
                        <input value={email} onChange={(e) => setEmail(e.target.value)} name="email" type="email" autoComplete="email" required className="w-full px-3 focus:outline-purple-500 py-2 pointer-events-auto border-purple-500 focus:z-10 sm:text-sm" placeholder="Email address"/>
                    </div>
                    <div className='mb-1 duration-500 hover:bg-purple-500 flex items-center w-full border border-gray-300 text-gray-900 pointer-events-none'>
                        <FaLock className='mx-3' />
                        <input value={password} onChange={(e) => setPassword(e.target.value)} name="password" type="password" autoComplete="current-password" required className="w-full px-3 focus:outline-purple-500 py-2 pointer-events-auto border-purple-500 focus:z-10 sm:text-sm" placeholder="Password"/>
                    </div>
                </div>

                <div>
                    <button type="submit" className="w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-gradient-to-r from-purple-500 via-pink-500 to-yellow-500 hover:from-purple-600 hover:via-pink-600 hover:to-yellow-600 focus:from-purple-400 focus:via-pink-400 focus:to-yellow-400 duration-300">
                        {isLoading ? "Logging In" : "Login" }
                    </button>
                </div>
                <div>
                    <p className='text-center'>OR</p>
                    <GoogleLogin className='font-bold' clientId={clientId} onSuccess={googleResponse} onFailure={handleFailure} cookiePolicy={'single_host_origin'} />
                </div>
                <p>Haven't had an account yet? <Link to="/register" className='text-blue-600 underline'>Signup Here.</Link></p>
            </form>
            <p className='text-gray-500'>Username: benjamin.turner@example.com, Pass: B3n#2023</p>
        </div>
    </div>
  )
}

export default Login