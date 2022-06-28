import React from 'react'
import { useState } from 'react';
import { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import axios from 'axios';
import Loading from './Loading';
import SuggestUser from './SuggestUser';

const Suggestion = () => {
    const user = useSelector(state => state.user.user);
    const [users, setUsers] = useState([]);
    const [loading, setLoading] = useState(false);    

    useEffect(() => {
        setLoading(true);
        const fetchUsers = async () => {
            const { data } = user?.followers.length > 0 ? (
                await axios.get(`/api/users/suggest?username=${user?.username}`)
            ) : user?.followings.length > 0 ? (
                await axios.get(`/api/users/tofollow?username=${user?.username}`)
            ) : (
                await axios.get(`/api/users`)
            )
            
            setUsers(data);
            setLoading(false);
        };
        fetchUsers();
    },[user.username]);

    const filterUser = users?.filter( el => el._id !== user._id);
    loading && <Loading />
  return (
    <div>
        <div className="m-3 fixed w-3/12">
            <div className="flex items-center mt-3">
                {user.profilePicture ? (
                    <img className='mr-4 w-8 h-8 object-cover rounded-full' src={user.profilePicture} alt="" />
                ): (
                    <img className='mr-4 w-8 h-8 object-cover rounded-full' src="https://www.business2community.com/wp-content/uploads/2017/08/blank-profile-picture-973460_640.png" alt="" />
                )}
                <span className='font-medium'>{user.username}</span>
            </div>
            <div className="">
                <div className="flex justify-between items-center mt-3">
                    <p className="text-gray-600 capitalize font-medium">Suggestions for you</p>
                    <Link to='/explore/people'>
                        <p className="text-sm text-blue-600">See All</p>
                    </Link>
                </div>
                <div className="users">
                    {filterUser.slice(0,5).map(user => (
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