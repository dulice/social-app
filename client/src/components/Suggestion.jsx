import React from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import Loading from "./Loading";
import SuggestUser from "./SuggestUser";
import DefaultUser from "../assets/default_user.jpg";
import { useGetToFollowUserQuery } from "../api/userApi";
import { fadeInVariant } from "../styles/variants";

const Suggestion = () => {
  const { user } = useSelector((state) => state.user.user);
  const { data: users, isLoading } = useGetToFollowUserQuery({
    userId: user._id,
    limit: 5,
  });

  return (
    <motion.div
      variants={fadeInVariant}
      initial="hidden"
      animate="visible"
      exit="exit"
      className="m-3 fixed md:w-1/3"
    >
      <Link className="flex items-center mt-3" to={`/profile/${user._id}`}>
        <img
          className="mr-4 w-8 h-8 object-cover rounded-full"
          src={user.profilePicture ? user.profilePicture : DefaultUser}
          alt=""
        />
        <span className="font-medium">{user.username}</span>
      </Link>
      <div className="">
        <div className="flex justify-between items-center mt-3">
          <p className="text-gray-600 capitalize font-medium">
            Suggestions for you
          </p>
          <Link to="/explore/people">
            <p className="text-sm font-medium">See All</p>
          </Link>
        </div>
        <div className="users">
          {isLoading ? (
            <Loading />
          ) : (
            users.map((user) => (
              <div key={user._id}>
                <SuggestUser user={user} />
              </div>
            ))
          )}
        </div>
      </div>
    </motion.div>
  );
};

export default Suggestion;
