import axios from "axios";
import React, { useContext, useEffect } from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { socket, Store } from "../context/appContext";
import DefaultUser from "../assets/default_user.jpg";

const ChatUser = () => {
  const { user } = useSelector((state) => state.user.user);
  const {
    friends,
    setFriends,
    conversationId,
    setConversationId,
    currentUser,
    setCurrentUser,
    setIsChatOpen,
  } = useContext(Store);

  const orderId = (id1, id2) => {
    if (id1 > id2) {
      return id1 + id2;
    } else {
      return id2 + id1;
    }
  };

  const handleOpenChat = async (member, room) => {
    setIsChatOpen(true);
    setCurrentUser(member);
    socket.emit("join", room, conversationId);
    setConversationId(room);
  };

  useEffect(() => {
    // socket.emit("friends", user._id);
    // socket.on('friends', (friend) => {
    //     setFriends(friend);
    // });
    const fetchFollowingsUser = async () => {
      const { data } = await axios.get(
        `${process.env.REACT_APP_API_URL}/api/users/friends/${user._id}`
      );
      setFriends(data);
    };
    fetchFollowingsUser();
  }, [user._id, setFriends]);

  return (
    <div className="col-span-5">
      <div className="overflow-y-scroll" style={{ height: "80vh" }}>
        <div className="mx-3 row-span-1">
          <p className="font-medium text-center my-3">{user?.username}</p>
        </div>
        <hr />
        <div className="m-5">
          {friends?.length < 1 && (
            <Link to="/" className="text-blue-600">
              Follow User to Start Conversation.
            </Link>
          )}
          {friends?.map((member) => (
            <div className="" key={member._id}>
              <div
                className={`flex justify-between items-center ${
                  member._id === currentUser._id && "bg-blue-700 text-white"
                }`}
                key={member._id}
              >
                <div
                  className="flex items-center m-3 cursor-pointer"
                  onClick={() =>
                    handleOpenChat(member, orderId(member._id, user._id))
                  }
                >
                  {member.profilePicture ? (
                    <img
                      className="mr-4 w-7 h-7 object-cover rounded-full"
                      src={member.profilePicture}
                      alt=""
                    />
                  ) : (
                    <img
                      className="mr-4 w-7 h-7 object-cover rounded-full"
                      src={DefaultUser}
                      alt=""
                    />
                  )}
                  <span className="font-medium text-sm ">
                    {member.username}
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ChatUser;
