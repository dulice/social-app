import React, { useEffect, useState } from 'react'
import axios from 'axios';
import Loading from '../components/Loading';
import { useParams } from 'react-router-dom';
import ExplorePost from '../components/ExplorePost';
import SuggestUser from '../components/SuggestUser';
import { HiX } from 'react-icons/hi';

const Profile = () => {
    const {username} = useParams();
    const [user, setUser] = useState({});
    const [posts, setPosts] = useState([]);
    const [loading, setLoading] = useState(false);
    const [followingUsers, setFollowingUsers] = useState([]);
    const [followerUsers, setFollowerUsers] = useState([]);
    const [isfollowing, setIsfollowing] = useState(false);
    const [isfollower, setIsfollower] = useState(false);
    const [count, setCount] = useState(0);
    let following = true;
    let follower = true;
    useEffect(() => {
        setLoading(true);
        const fetchPosts = async () => {
            try {
                const { data } = await axios.get(`/api/posts/post/${username}`);
                setPosts(data.posts);
                setCount(data.countPosts);
                setLoading(false);
            } catch (err) {
                console.log(err);
                setLoading(false);
            }
        };
        fetchPosts();
    },[username]);

    useEffect(() => {
        const fetchUser = async () => {
            setLoading(true);
            try {
                const { data } = await axios.get(`/api/users/eachuser?username=${username}`);
                setUser(data);
                setLoading(false);
            } catch (err) {
                console.log(err);
                setLoading(false);
            }
        }
        fetchUser();
    },[username]);

    const handleFollowing = async () => {
        setIsfollowing(true);
        setLoading(false);
        try {
            const { data }  = await axios.get(`/api/users/friends/${user?._id}`);
            setFollowingUsers(data);
            setLoading(false);
        } catch (err) {
            console.log(err.message);
            setLoading(false);
        }
    }

    const handleFollowers = async () => {
        setIsfollower(true);
        setLoading(false);
        try {
            const { data }  = await axios.get(`/api/users/follower/${user?._id}`);
            setFollowerUsers(data);
            setLoading(false);
        } catch (err) {
            console.log(err.message);
            setLoading(false);
        }
    }

  return (
    <div className='max-w-4xl mx-auto px-3 text-left mt-20'>
        {loading ? <Loading /> :     
            <div className="grid grid-cols-12 items-center">
                <div className="col-span-12 md:col-span-3">
                    {user.profilePicture ? (
                        <img className='mx-auto md:mx-0 w-32 h-32 object-cover rounded-full' src={user.profilePicture} alt="" />
                    ): (
                        <img className='mx-auto md:mx-0 w-32 h-32 object-cover rounded-full' src="https://www.business2community.com/wp-content/uploads/2017/08/blank-profile-picture-973460_640.png" alt="" />
                    )}
                </div>
                <div className="col-span-12 md:col-span-4">
                    <p className="text-center md:text-left text-3xl">{user.username}</p>
                    <div className="grid grid-cols-12 my-3">
                        <div className="col-span-4">{count} posts</div>
                        <div className="col-span-4 cursor-pointer" onClick={handleFollowers}>{user?.followers?.length} followers</div>
                        <div className="col-span-4 cursor-pointer" onClick={handleFollowing}>{user?.followings?.length} followings</div>
                    </div>
                </div>
            </div>
        }

        {loading ? <Loading /> :
        (
            <div className="divide-y grid grid-cols-12 items-center mt-5 gap-6">
                {posts.map(post => (
                    <div key={post._id} className="col-span-4">
                        <ExplorePost post={post}/>
                    </div>
                ))}
            </div>
        )}

        {loading ? <Loading /> :
            isfollowing &&
                <div className="fixed inset-1/4 bg-gray-300 rounded-md overflow-y-scroll" onClick={() => setIsfollowing(false)}>
                    <div className="mx-3 divide-x static top-0">
                        <p className="font-meduim text-center my-3">Following</p>
                        <HiX className='text-2xl absolute top-3 right-4' onClick={() => setIsfollowing(false)} />
                    </div>
                    <div className='m-7'>
                        { followingUsers?.map(user => (
                            <div className="" key={user._id}>
                                <SuggestUser user={user} following={following}/>
                            </div>
                        ))}
                    </div>
                    
                </div>       
        }

        {loading ? <Loading /> :
            isfollower &&
                <div className="fixed inset-1/4 bg-gray-300 rounded-md overflow-y-scroll" onClick={() => setIsfollower(false)}>
                    <div className="mx-3 divide-x static top-0">
                        <p className="font-meduim text-center my-3">Follower</p>
                        <HiX className='text-2xl absolute top-3 right-4' onClick={() => setIsfollower(false)} />
                    </div>
                    <div className='m-7'>
                        { followerUsers?.map(user => (
                            <div className="" key={user._id}>
                                <SuggestUser user={user} follower={follower}/>
                            </div>
                        ))}
                    </div>
                    
                </div>       
        }
    </div>
  )
}

export default Profile