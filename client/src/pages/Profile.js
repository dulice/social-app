import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux';
import axios from 'axios';
import Loading from '../components/Loading';

const Profile = () => {
    const user = useSelector(state => state.user.user);
    const [posts, setPosts] = useState([]);
    const [loading, setLoading] = useState(false);
    const [count, setCount] = useState(0);
    useEffect(() => {
        setLoading(true);
        const fetchPosts = async () => {
            try {
                const { data } = await axios.get(`/api/posts/post/${user.username}`);
                setPosts(data.posts);
                setCount(data.countPosts);
                setLoading(false);
            } catch (err) {
                console.log(err);
                setLoading(false);
            }
        };
        fetchPosts();
    },[]);

  return (
    <div className='max-w-4xl mx-auto px-3 text-left mt-20'>
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
                    <div className="col-span-4">{user.followers.length} followers</div>
                    <div className="col-span-4">{user.followings.length} followings</div>
                </div>
            </div>
        </div>

        {loading ? <Loading /> :
        (
            <div className="divide-y grid grid-cols-12 items-center mt-5 gap-6">
                {posts.map(post => (
                    <div className="col-span-4 profile-image-container mb-3" key={post._id}>
                        <img src={post.image} alt="" className='' />
                    </div>
                ))}
            </div>
        )}
    </div>
  )
}

export default Profile