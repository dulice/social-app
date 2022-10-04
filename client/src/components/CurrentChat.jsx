import React, { useState } from 'react'
import Picker from 'emoji-picker-react';
import { BsEmojiSmile } from 'react-icons/bs';
import { AiOutlineSend } from 'react-icons/ai';
import { useSelector } from 'react-redux';
import ScrollToBottom from 'react-scroll-to-bottom';
import moment from 'moment';
import { socket, Store } from '../context/appContext';
import { useContext } from 'react';

const CurrentChat = () => {
    const user = useSelector(state => state.user.user);
    const { conversationId, messages, setMessages, currentUser } = useContext(Store);
    const [message, setMessage] = useState('');
    const [showEmoji, setShowEmoji] = useState(false);

    socket.off('room-messages').on("room-messages", (payload) => {
        setMessages(payload);
    });

    const onEmojiClick = (event, emojiObject) => {
        // console.log(emojiObject.emoji);
        let msg = message;
        msg += emojiObject.emoji;
        setMessage(msg);
    };

    const handleSubmitChat = (e) => {
        e.preventDefault();
        socket.emit('new-message', conversationId, user._id, message );
        setMessage("");
    }

  return (
    <div>
        <div className=''>
            <div className="flex items-center my-3 cursor-pointer">
                {currentUser.profilePicture ? (
                    <img className='mr-4 w-7 h-7 object-cover rounded-full' src={currentUser.profilePicture} alt="" />
                ): (
                    <img className='mr-4 w-7 h-7 object-cover rounded-full' src="https://www.business2community.com/wp-content/uploads/2017/08/blank-profile-picture-973460_640.png" alt="" />
                )}
                <span className='font-medium text-sm '>{currentUser.username}</span>
            </div>
            <hr />
            <ScrollToBottom>
                <div style={{height: '60vh'}} onClick={() => setShowEmoji(false)}>
                    {messages.length === 0 && (<p className='font-medium mt-5'>Send message to start conversation.</p>)}
                    {messages?.map((chat, index) => (
                        <div key={index}>
                        <p className={`mt-5 ${ chat.sender === user._id ? 'text-right mr-3' : 'text-left ml-3'}`}>
                            <span className={`border p-2 rounded-full ${ chat.sender === user._id ? 'bg-gray-200' : 'bg-blue-500 text-white'}`}>{chat.message}</span>
                        </p>
                        <p className={`mt-1 ${ chat.sender === user._id ? 'text-right mr-3' : 'text-left ml-3'}`}>
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