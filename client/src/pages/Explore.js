import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux';
import ExplorePost from '../components/ExplorePost';
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
    // console.log(filterPost)

  return (
    <div className='max-w-5xl mx-auto px-3 text-left mt-20'>
        { loading ? <Loading />
        : (
            <div className="divide-y grid grid-cols-12 items-center mt-5 gap-6">
                {filterPost.map(post => (
                    <div key={post._id} className="col-span-4">
                        <ExplorePost post={post}/>
                    </div>
                ))}
            </div>
        )}
    </div>
  )
}

export default Explore