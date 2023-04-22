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