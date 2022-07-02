import React, { useEffect, useState } from 'react'
import Picker from 'emoji-picker-react';
import { BsEmojiSmile } from 'react-icons/bs';
import { AiOutlineSend } from 'react-icons/ai';
import axios from 'axios';
import { useSelector } from 'react-redux';
import Loading from './Loading';
import ScrollToBottom from 'react-scroll-to-bottom';
import moment from 'moment';

const CurrentChat = ({chatUser, socket}) => {
    const me = useSelector(state => state.user.user);
    const [chats, setChats] = useState([]);
    const [message, setMessage] = useState('');
    const [showEmoji, setShowEmoji] = useState(false);
    const [loading, setLoading] = useState(false);
    const [messages, setMessages] = useState([]);

     useEffect(() => {
        const fetchChat = async () => {
            setLoading(true);
            try{
                if(chatUser._id){
                    const { data } = await axios.get(`/api/conversations/find/${me?._id}/${chatUser._id}`);
                    const res = await axios.get(`/api/messages/${data?._id}`);
                    setChats(res.data);
                    setLoading(false);
                }
            } catch (err) {
                console.log(err.message);
                setLoading(false);
            }
        }
        fetchChat();
    },[me._id, chatUser._id]);

    // useEffect(() => {
    //     socket.on("chatResult", (result) => {
    //         setMessages([...messages, {message: result.message, sender: result.sender}]);
    //         console.log(messages);
    //     });
    // },[messages, socket]);

    const sortChat = chats?.sort((a,b) => new Date(a.createdAt) - new Date(b.createdAt));

    const onEmojiClick = (event, emojiObject) => {
        // console.log(emojiObject.emoji);
        let msg = message;
        msg += emojiObject.emoji;
        setMessage(msg);
    };

    const handleSubmitChat = async (e) => {
        e.preventDefault();
        try {
            if(chatUser._id) {
                const { data } = await axios.get(`/api/conversations/find/${me?._id}/${chatUser._id}`);
                await axios.post('/api/messages', {
                conversationId: data?._id,
                message,
                sender: me._id,
            });
            let date = new Date();
            setMessages([...messages, {message, createdAt: date, sender: me._id}]);

            socket.emit('chatInput', {message, sender: me._id, conversationId: data?._id,});
            setMessage('');
            }
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
            <ScrollToBottom>
                <div className='overflow-y-scroll' style={{height: '60vh'}} onClick={() => setShowEmoji(false)}>
                    {loading ? <Loading /> :
                    chats.length === 0 ? (<p className='font-medium mt-5'>Send message to start converstion.</p>)
                    : (sortChat?.map(chat => (
                        <div key={chat._id}>
                            <p className={`mt-5 ${ chat.sender === me._id ? 'text-right mr-3' : 'text-left ml-3'}`}>
                                <span className={`border p-2 rounded-full ${ chat.sender === me._id ? 'bg-gray-200' : 'bg-blue-500 text-white'}`}>{chat.message}</span>
                            </p>
                            <p className={`mt-1 ${ chat.sender === me._id ? 'text-right mr-3' : 'text-left ml-3'}`}>
                                <small className=''>{moment(chat.createdAt).fromNow()}</small>
                            </p>
                        </div>
                    )))
                    }
                    {messages?.map((chat, index) => (
                        <div key={index}>
                        <p className={`mt-5 ${ chat.sender === me._id ? 'text-right mr-3' : 'text-left ml-3'}`}>
                            <span className={`border p-2 rounded-full ${ chat.sender === me._id ? 'bg-gray-200' : 'bg-blue-500 text-white'}`}>{chat.message}</span>
                        </p>
                        <p className={`mt-1 ${ chat.sender === me._id ? 'text-right mr-3' : 'text-left ml-3'}`}>
                            <small className=''>{moment(chat.createdAt).fromNow()}</small>
                        </p>
                    </div>
                    ))}
                </div>
            </ScrollToBottom>
            {showEmoji &&
                <div className='absolute bottom-16'>
                    <Picker onEmojiClick={onEmojiClick} />
                </div>
            }
            <div className='absolute bottom-0 my-3 border p-2 rounded-full bg-white' style={{width: '95%'}}>
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