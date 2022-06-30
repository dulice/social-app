import React from 'react'
import { useState } from 'react';
import { useEffect } from 'react';
import { useSelector } from 'react-redux';
import axios from 'axios';
import Loading from '../components/Loading';
import SuggestUser from '../components/SuggestUser';

const Suggest = () => {
    const user = useSelector(state => state.user.user);
    const [users, setUsers] = useState([]);
    const [loading, setLoading] = useState(false);    
    const suggest = true;

    const isEqual = (a,b) => JSON.stringify(a) === JSON.stringify(b);
    useEffect(() => {
        setLoading(true);
        const fetchUsers = async () => {
            const { data } = isEqual(user.followers, user.followings) ? (
                await axios.get(`/api/users/tofollow?username=${user?.username}`)
            ) : user?.followers.length > 0 ? (
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
    },[user]);

    const filterUser = users?.filter( el => el._id !== user._id);

  return (
    <div className='max-w-xl mx-auto px-3 mt-20'>
        {loading ? <Loading />
        :(
            <div className="">
                <div className="">
                    <p className="capitalize font-medium text-left">Suggested</p>              
                    <div className="users">
                        {filterUser.map(user => (
                            <div key={user._id}>
                                <SuggestUser user={user} suggest={suggest} />
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        )}
    </div>
  )
}

export default Suggest