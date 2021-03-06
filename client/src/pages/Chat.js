import axios from 'axios';
import React, { useState, useEffect } from 'react'
import { useSelector } from 'react-redux';
import ChatUser from '../components/ChatUser';
import Loading from '../components/Loading';
import CurrentChat from '../components/CurrentChat';
import io from 'socket.io-client';
import { toast } from 'react-toastify'
const socket = io.connect('http://localhost:5000');

const Chat = () => {
    const user = useSelector(state => state.user.user);
    const [loading, setLoading] = useState(false);
    const [isChatOpen, setIsChatOpen] = useState(false);
    const [followingUsers, setFollowingUsers] = useState([]);
    const [chatUser, setChatUser] = useState({});

    useEffect(() => {
        const handleFriends = async () => {
            setLoading(true);
            try {
                const { data }  = await axios.get(`/api/users/friends/${user?._id}`);
                setFollowingUsers(data);
                setLoading(false);
            } catch (err) {
                if(err.response) {
                    toast.error(err.response.data.message);
                }
                setLoading(false);
            }
        }
        handleFriends();
    },[user._id]);

    const handleOpenChat = async (name) => {
        setIsChatOpen(true);
        setLoading(true);
        try {
            const { data } = await axios.get(`/api/users/eachuser?username=${name}`);
            setChatUser(data);
            const res = await axios.get(`/api/conversations/find/${user?._id}/${chatUser?._id}`);
            socket.emit('join', res.data?._id);
            setLoading(false);
        } catch (err) {
            if(err.response) {
                toast.error(err.response.data.message);
            }
            setLoading(false);
        }
    }

  return (
    <div className='mt-20 p-5'>
        <div className="border max-w-5xl mx-auto rounded-md grid grid-cols-12 gap-6">
            <div className='col-span-5'>
            {loading ? <Loading /> :
                (
                    <div className='overflow-y-scroll' style={{height: '80vh'}}>
                        <div className="mx-3 row-span-1">
                            <p className="font-medium text-center my-3">{user?.username}</p>
                        </div>
                        <hr />
                        <div className='m-5'>
                            { followingUsers?.map(user => (
                                <div className="" key={user._id}>
                                    <ChatUser user={user} handleOpenChat={handleOpenChat}/>
                                </div>
                            ))}
                        </div>                      
                        
                    </div>       
                )
            }
            </div>
            <div className="col-span-7 relative" style={{height: '80vh'}}>
                {isChatOpen ? (
                    <CurrentChat chatUser={chatUser} socket={socket} />
                ): (
                    <div>
                        <img src="https://c.tenor.com/jQzK2XwJzcAAAAAM/seal-bread.gif" alt="" className='mx-auto' />
                        <p className='font-medium text-xl my-5'>Tap any chat to start conversation!</p>
                    </div>
                )}
            </div>
        </div>
    </div>
  )
}

export default Chat