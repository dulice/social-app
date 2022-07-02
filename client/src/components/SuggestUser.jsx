import axios from 'axios';
import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { userAction } from '../redux/userSlice';

const SuggestUser = ({user, suggest, following, follower}) => {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const currentUser = useSelector(state => state.user.user);
    const [follow, setFollow] = useState(false);

    const handleFollow = async (id) => {
        try {
            await axios.put(`/api/users/${currentUser._id}/follow`, {
                userId: id
            });
            await axios.post(`/api/conversations`, {
                sender: currentUser._id,
                reciever: id
            });
            const { data } = await axios.get(`/api/users/eachuser?username=${currentUser.username}`);
            dispatch(userAction.register(data)); 
            localStorage.setItem('user', JSON.stringify(data));      
            setFollow(true);
        } catch (err) {
            console.log(err)
        }
    };

    const handleUnfollow = async (id) => {
        await axios.put(`/api/users/${currentUser._id}/unfollow`, {
            userId: id
        });
        const { data } = await axios.get(`/api/users/eachuser?username=${currentUser.username}`);
        dispatch(userAction.register(data)); 
        localStorage.setItem('user', JSON.stringify(data));
        setFollow(false);
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
                <button onClick={() => handleUnfollow(user._id)} className={`text-blue-600 font-medium text-sm ${suggest && 'bg-blue-500 text-white p-2 font-normal rounded-md mb-3'}`}>Following</button>
            ) : following ? (
                <button onClick={() => handleUnfollow(user._id)} className={`text-gray-600 rounded-md p-2 border font-medium text-sm `}>Following</button>
            ) : follower ? (
                <button onClick={() => handleUnfollow(user._id)} className={`text-gray-600 rounded-md p-2 border font-medium text-sm `}>Remove</button>
            ) : (
                <button onClick={() => handleFollow(user._id)} className={`text-blue-600 font-medium text-sm ${suggest && 'bg-blue-500 !text-white p-2 font-normal rounded-md mb-3'}`}>Follow</button>
            )}                            
        </div>
    </div>
  )
}

export default SuggestUser