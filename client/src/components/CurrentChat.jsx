import React, { useEffect, useState } from 'react'
import Picker from 'emoji-picker-react';
import { BsEmojiSmile } from 'react-icons/bs';
import { AiOutlineSend } from 'react-icons/ai';
import axios from 'axios';
import { useSelector } from 'react-redux';
import Loading from './Loading';

const CurrentChat = ({chatUser}) => {
    // let chats = [];
    const me = useSelector(state => state.user.user);
    const [chats, setChats] = useState([]);
    const [message, setMessage] = useState('');
    const [showEmoji, setShowEmoji] = useState(false);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        const fetchChat = async () => {
            setLoading(true);
            try{
                const { data } = await axios.get(`/api/chats/chat?sender=${me._id}&reciever=${chatUser._id}`);
                setChats(data);
                setLoading(false);
            } catch (err) {
                console.log(err.message);
                setLoading(false);
            }
        }
        fetchChat();
    },[me._id, chatUser._id]);

    const sortChat = chats?.sort((a,b) => new Date(a.createdAt) - new Date(b.createdAt));

    const onEmojiClick = (event, emojiObject) => {
        console.log(emojiObject.emoji);
        let msg = message;
        msg += emojiObject.emoji;
        setMessage(msg);
    };

    const handleSubmitChat = async (e) => {
        e.preventDefault();
        try {
            const { data } = await axios.post('/api/chats', {
                message,
                sender: me._id,
                reciever: chatUser._id 
            });
            setMessage('');
            console.log(data);
        } catch (err) {
            console.log(err.message);
        }
    }
  return (
    <div>
        <div className=''>
            <div className="flex items-center my-3 cursor-pointer">
                {chatUser.profilePicture ? (
                    <img className='mr-4 w-7 h-7 object-cover rounded-full' src={chatUser.profilePicture} alt="" />
                ): (
                    <img className='mr-4 w-7 h-7 object-cover rounded-full' src="https://www.business2community.com/wp-content/uploads/2017/08/blank-profile-picture-973460_640.png" alt="" />
                )}
                <span className='font-medium text-sm '>{chatUser.username}</span>
            </div>
            <hr />
            {loading ? <Loading /> :
            (sortChat?.map(chat => (
                <div key={chat._id}>
                    <p className={`mt-5 ${ chat.sender === me._id ? 'text-right mr-3' : 'text-left ml-3'}`}>
                        <span className={`border p-2 rounded-full ${ chat.sender === me._id ? 'bg-gray-200' : 'bg-blue-500 text-white'}`}>{chat.message}</span>
                    </p>
                </div>
            )))
            }
            {showEmoji &&
                <div className='absolute bottom-16'>
                    <Picker onEmojiClick={onEmojiClick} />
                </div>
            }
            <div className='absolute bottom-0 my-3 border p-2 rounded-full' style={{width: '95%'}}>
                <form action="" className='flex items-center' onSubmit={handleSubmitChat}>
                    <BsEmojiSmile  className='text-xl' onClick={() => setShowEmoji(!showEmoji)}/>
                    <input type="text" value={message} onChange={(e) => setMessage(e.target.value)} placeholder='Message...' className='ml-3 focus:outline-none w-5/6'/>
                    <button type='submit' className='ml-5'>
                        <AiOutlineSend className='text-xl' />
                    </button>
                </form>
            </div>
        </div>
    </div>
  )
}

export default CurrentChat