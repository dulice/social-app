import React, { useContext } from 'react'
import ChatUser from '../components/ChatUser';
import CurrentChat from '../components/CurrentChat';
import { Store } from '../context/appContext';

const Chat = () => {
    const { isChatOpen } = useContext(Store);

  return (
    <div className='mt-20 p-5'>
        <div className="border max-w-5xl mx-auto rounded-md grid grid-cols-12 gap-6">
            <ChatUser />   
            <div className="col-span-7 relative" style={{height: '80vh'}}>
                {isChatOpen ? (
                    <CurrentChat />                    
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