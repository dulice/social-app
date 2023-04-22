import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { useLocation } from 'react-router-dom';
import { toast } from 'react-toastify';
import Loading from '../components/Loading';
import Post from '../components/Post';

const SearchResult = () => {
    const {search} = useLocation();
    let searchInput = new URLSearchParams(search).get('q');
    const [posts, setPosts] = useState([]);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        const fetchPost = async () => {
            setLoading(true);
            try {
                const { data } = await axios.get(`${process.env.REACT_APP_API_URL}/api/posts`);
                setPosts(data);
                setLoading(false);
            } catch (err) {
                if(err.response) {
                    toast.error(err.response.data.message);
                    setLoading(false);
                }
            }
        }
        fetchPost();
    },[]);

    searchInput = new RegExp(searchInput, 'i');
    const searchQuery = posts?.filter(post => searchInput.test(post.description));

  return (
    <div className='max-w-3xl mx-auto px-3'>
        <div className="col-span-12 md:col-span-6 mt-20">
        {loading ? (
            <Loading />
        ): searchQuery.length === 0 ? (<p className='font-medium mt-10'>No Result Found</p>) : (
            searchQuery?.map(post => (
            <div className="" key={post._id}>
                <Post post={post}/>
            </div>
            ))
        )}
        </div>
    </div>
  )
}

export default SearchResult