import React, { useState } from "react";
import { motion } from "framer-motion";
import Loading from "../components/Loading";
import { useParams } from "react-router-dom";
import ExplorePost from "../components/ExplorePost";
import SuggestUser from "../components/SuggestUser";
import { HiX } from "react-icons/hi";
import DefaultUser from "../assets/default_user.jpg";
import { useGetUserQuery } from "../api/userApi";
import { useGetOwnerPostsQuery } from "../api/postApi";
import Error from "./Error";
import { fadeInVariant } from "../styles/variants";

const Profile = () => {
  const { userId } = useParams();
  const [isfollowing, setIsfollowing] = useState(false);
  const [isfollower, setIsfollower] = useState(false);

  const { data: user, isLoading: loading } = useGetUserQuery(userId);
  const { data, isLoading, isError, error } = useGetOwnerPostsQuery(userId);
  const handleFollowing = () => {
    setIsfollowing(true);
  };

  const handleFollowers = () => {
    setIsfollower(true);
  };

  if (isLoading || loading) return <Loading />;
  if (isError) return <Error error={error} />;

  return (
    <motion.div
      variants={fadeInVariant}
      initial="hidden"
      animate="visible"
      exit="exit"
      className="max-w-4xl mx-auto px-3 text-left mt-20"
    >
      <div className="grid grid-cols-12 items-center">
        <div className="col-span-12 md:col-span-3">
          <img
            className="mx-auto md:mx-0 w-32 h-32 object-cover rounded-full"
            src={user.profilePicture ? user.profilePicture : DefaultUser}
            alt=""
          />
        </div>
        <div className="col-span-12 md:col-span-5">
          <p className="text-center md:text-left text-3xl">{user.username}</p>
          <div className="grid grid-cols-12 my-3">
            <div className="col-span-4">{data.countPosts} posts</div>
            <div
              className="col-span-4 cursor-pointer"
              onClick={handleFollowers}
            >
              {user.followers?.length} followers
            </div>
            <div
              className="col-span-4 cursor-pointer"
              onClick={handleFollowing}
            >
              {user.followings?.length} followings
            </div>
          </div>
        </div>
      </div>
      <hr className="m-4" />
      {data.posts.length <= 0 && (
        <p className="font-bold text-center">No Post Available</p>
      )}
      <div className="divide-y grid grid-cols-12 items-center mt-5 gap-6">
        {data.posts.map((post) => (
          <div key={post._id} className="col-span-4">
            <ExplorePost post={post} />
          </div>
        ))}
      </div>

      {isfollowing && (
        <div
          className="fixed inset-1/4 bg-gray-300 rounded-md overflow-y-scroll"
          onClick={() => setIsfollowing(false)}
        >
          <div className="mx-3 divide-x static top-0">
            <p className="font-medium text-center my-3">Following</p>
            <HiX
              className="text-2xl absolute top-3 right-4"
              onClick={() => setIsfollowing(false)}
            />
          </div>
          <div className="m-7">
            {user.followings.length > 0 ? (
              user.followings?.map((user) => (
                <div className="" key={user._id}>
                  <SuggestUser user={user} following={true} />
                </div>
              ))
            ) : (
              <p className="text-center">No Following yet.</p>
            )}
          </div>
        </div>
      )}

      {isfollower && (
        <div
          className="fixed inset-1/4 bg-gray-300 rounded-md overflow-y-scroll"
          onClick={() => setIsfollower(false)}
        >
          <div className="mx-3 divide-x static top-0">
            <p className="font-medium text-center my-3">Followers</p>
            <HiX
              className="text-2xl absolute top-3 right-4"
              onClick={() => setIsfollower(false)}
            />
          </div>
          <div className="m-7">
            {user.followers.length > 0 ? (
              user.followers?.map((user) => (
                <div className="" key={user._id}>
                  <SuggestUser user={user} follower={true} />
                </div>
              ))
            ) : (
              <p className="text-center">No Follower yet.</p>
            )}
          </div>
        </div>
      )}
    </motion.div>
  );
};

export default Profile;
