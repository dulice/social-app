import React, { useState } from "react";
import { useSelector } from "react-redux";
import{ Link } from 'react-router-dom';
import DefaultUser from "../assets/default_user.jpg";
import { useFollowUserMutation, useUnfollowUserMutation } from "../api/userApi";

const SuggestUser = ({ user, suggest, following, follower, username }) => {
  const currentUser = useSelector((state) => state.user.user);
  const [followUser] = useFollowUserMutation();
  const [unfollowUser] = useUnfollowUserMutation();
  const [follow, setFollow] = useState(false);

  const handleFollow = async () => {
    await followUser({currentUserId: currentUser.user._id, userId: user._id})
    setFollow(true);
  };

  const handleUnFollow = async () => {
    await unfollowUser({currentUserId: currentUser.user._id, userId: user._id});
    setFollow(false);
  };

  return (
    <div className="flex justify-between items-center" key={user._id}>
      <Link to={`/profile/${user._id}`}
        className="flex items-center mt-3 cursor-pointer"
      >
        <img
          className="mr-4 w-7 h-7 object-cover rounded-full"
          src={user.profilePicture ? user.profilePicture : DefaultUser}
          alt=""
        />
        <span className="font-medium text-sm  hover:underline ">
          {user.username}
        </span>
      </Link>
      <div className="">
        {follow ? (
          <button
            onClick={handleUnFollow}
            className={`text-blue-600 font-medium text-sm ${
              suggest &&
              "bg-blue-500 text-white p-2 font-normal rounded-md mb-3"
            }`}
          >
            Following
          </button>
        ) : following ? (
          <button
            onClick={handleUnFollow}
            className={`text-gray-600 rounded-md p-2 border font-medium text-sm `}
          >
            Following
          </button>
        ) : follower ? (
          <button
            onClick={handleUnFollow}
            className={`text-gray-600 rounded-md p-2 border font-medium text-sm `}
          >
            {currentUser.username === username && "Remove"}
          </button>
        ) : (
          <button
            onClick={handleFollow}
            className={`text-blue-600 font-medium text-sm ${
              suggest &&
              "bg-blue-500 !text-white p-2 font-normal rounded-md mb-3"
            }`}
          >
            Follow
          </button>
        )}
      </div>
    </div>
  );
};

export default SuggestUser;
