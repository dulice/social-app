import React from 'react'
import { useState } from 'react';
import { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import Loading from './Loading';
import SuggestUser from './SuggestUser';
import DefaultUser from '../assets/default_user.jpg';

const Suggestion = () => {
    const navigate = useNavigate();
    const user = useSelector(state => state.user.user);
    const [users, setUsers] = useState([]);
    const [loading, setLoading] = useState(false);    

    useEffect(() => {
        setLoading(true);
        const fetchUsers = async () => {
            const { data } = await axios.get(`${process.env.REACT_APP_API_URL}/api/users/tofollow?username=${user?.username}`);          
            setUsers(data);
            setLoading(false);
        };
        fetchUsers();
    },[user]);

    const filterUser = users?.filter( el => el._id !== user._id);
    loading && <Loading />
  return (
    <div>
        <div className="m-3 fixed w-3/12">
            <div className="flex items-center mt-3" onClick={() => navigate(`/profile/${user.username}`)}>
                {user.profilePicture ? (
                    <img className='mr-4 w-8 h-8 object-cover rounded-full' src={user.profilePicture} alt="" />
                ): (
                    <img className='mr-4 w-8 h-8 object-cover rounded-full' src={DefaultUser} alt="" />
                )}
                <span className='font-medium'>{user.username}</span>
            </div>
            <div className="">
                <div className="flex justify-between items-center mt-3">
                    <p className="text-gray-600 capitalize font-medium">Suggestions for you</p>
                    <Link to='/explore/people'>
                        <p className="text-sm font-medium">See All</p>
                    </Link>
                </div>
                <div className="users">
                    {loading ? <Loading /> : filterUser.slice(0,5).map(user => (
                        <div key={user._id}>
                            <SuggestUser user={user} />
                        </div>
                    ))}
                </div>
            </div>
        </div>
    </div>
  )
}

export default Suggestion