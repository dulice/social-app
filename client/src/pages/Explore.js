import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux';
import Loading from '../components/Loading';

const Explore = () => {
    const [posts, setPost] = useState([]);
    const [loading, setLoading] = useState(false);
    const user = useSelector(state => state.user.user);
    useEffect(() => {
        setLoading(true);
        const fetchPosts = async () => {
            try {
                const { data } = await axios.get('/api/posts');
                setPost(data);
                setLoading(false);
            } catch (err) {
                console.log(err.message);
                setLoading(false);
            }
        };
        fetchPosts();
    },[]);

    const filterPost = posts?.filter(post => post.userId !== user._id);
  return (
    <div className='max-w-5xl mx-auto px-3 text-left mt-20'>
        { loading ? <Loading />
        : (
            <div className="divide-y grid grid-cols-12 items-center mt-5 gap-6">
                {filterPost.map(post => (
                    <div className="col-span-4 profile-image-container mb-3" key={post._id}>
                        <img src={post.image} alt="" className='' />
                    </div>
                ))}
            </div>
        )}
    </div>
  )
}

export default Explore