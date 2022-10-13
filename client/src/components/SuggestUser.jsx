import axios from 'axios';
import React, { useState } from 'react'
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';

const SuggestUser = ({user, suggest, following, follower, username}) => {
    const navigate = useNavigate();
    const currentUser = useSelector(state => state.user.user);
    const [follow, setFollow] = useState(false);

    const handleFollow = async (id) => {
        try {
            await axios.put(`/api/users/${currentUser._id}/follow`, {
                userId: id
            });
            setFollow(true);
        } catch (err) {
            if(err.response) {
                toast.error(err.response.data);
            }
        }
    };

    const handleUnFollow = async (id) => {
        try {
            await axios.put(`/api/users/${currentUser._id}/unfollow`, {
                userId: id
            });
            setFollow(false);
        } catch (err){
            toast.error(err.response.data);
        }
    }

  return (
    <div className="flex justify-between items-center" key={user._id}>
        <div className="flex items-center mt-3 cursor-pointer" onClick={() => navigate(`/profile/${user.username}`)}>
            {user.profilePicture ? (
                <img className='mr-4 w-7 h-7 object-cover rounded-full' src={user.profilePicture} alt="" />
            ): (
                <img className='mr-4 w-7 h-7 object-cover rounded-full' src="https://www.business2community.com/wp-content/uploads/2017/08/blank-profile-picture-973460_640.png" alt="" />
            )}
            <span className='font-medium text-sm  hover:underline '>{user.username}</span>
        </div>
        <div className="">
                {follow ? (
                    <button onClick={() => handleUnFollow(user._id)} className={`text-blue-600 font-medium text-sm ${suggest && 'bg-blue-500 text-white p-2 font-normal rounded-md mb-3'}`}>Following</button>
                ) : following ? (
                    <button onClick={() => handleUnFollow(user._id)} className={`text-gray-600 rounded-md p-2 border font-medium text-sm `}>Following</button>
                ) : follower ? (
                    <button onClick={() => handleUnFollow(user._id)} className={`text-gray-600 rounded-md p-2 border font-medium text-sm `}>{currentUser.username === username && "Remove"}</button>
                ) : (
                    <button onClick={() => handleFollow(user._id)} className={`text-blue-600 font-medium text-sm ${suggest && 'bg-blue-500 !text-white p-2 font-normal rounded-md mb-3'}`}>Follow</button>
                )}
        </div>
    </div>
  )
}

export default SuggestUser