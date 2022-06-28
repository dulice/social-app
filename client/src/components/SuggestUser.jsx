import axios from 'axios';
import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { userAction } from '../redux/userSlice';

const SuggestUser = ({user}) => {
    const dispatch = useDispatch();
    const currentUser = useSelector(state => state.user.user);
    const [follow, setFollow] = useState(false);

    const handleFollow = async (id) => {
        try {
            await axios.put(`/api/users/${currentUser._id}/follow`, {
                userId: id
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
        <div className="flex items-center mt-3">
            {user.profilePicture ? (
                <img className='mr-4 w-7 h-7 object-cover rounded-full' src={user.profilePicture} alt="" />
            ): (
                <img className='mr-4 w-7 h-7 object-cover rounded-full' src="https://www.business2community.com/wp-content/uploads/2017/08/blank-profile-picture-973460_640.png" alt="" />
            )}
            <span className='font-medium text-sm'>{user.username}</span>
        </div>
        <div className="">
            {follow ? (
                <button onClick={() => handleUnfollow(user._id)} className='text-blue-600 font-medium text-sm'>Following</button>
            ) : (
                <button onClick={() => handleFollow(user._id)} className='text-blue-600 font-medium text-sm'>Follow</button>
            )}                              
        </div>
    </div>
  )
}

export default SuggestUser