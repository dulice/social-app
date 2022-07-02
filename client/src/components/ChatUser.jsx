import React from 'react'
const ChatUser = ({user, handleOpenChat}) => {

  return (
    <div className="flex justify-between items-center" key={user._id}>
        <div className="flex items-center mt-3 cursor-pointer" onClick={() => handleOpenChat(user.username, user._id)}>
            {user.profilePicture ? (
                <img className='mr-4 w-7 h-7 object-cover rounded-full' src={user.profilePicture} alt="" />
            ): (
                <img className='mr-4 w-7 h-7 object-cover rounded-full' src="https://www.business2community.com/wp-content/uploads/2017/08/blank-profile-picture-973460_640.png" alt="" />
            )}
            <span className='font-medium text-sm '>{user.username}</span>
        </div>
    </div>
  )
}

export default ChatUser