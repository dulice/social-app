import React, {useState, useEffect} from 'react'
import axios from 'axios';
import { useDispatch, useSelector } from 'react-redux';
import { timelineAction } from '../redux/timelineSlice';
import Post from './Post';
import Loading from './Loading';

const Posts = () => {
  const dispatch = useDispatch();
  const user = useSelector(state => state.user.user);
  const [posts, setPost] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
      const fetchPosts = async () => {
        setLoading(true);
        try{
          const { data } = user?.followings.length > 0 
            ? await axios.get(`/api/posts/timeline/${user?._id}`) 
            : await axios.get('/api/posts');
          setPost(data);
          // console.log(data);
          dispatch(timelineAction.feedPosts(data));
          setLoading(false);
        } catch (err) {
          console.log(err.message);
          setLoading(false);
        }
      }
      fetchPosts();
  },[user._id, dispatch, user.followings.length]);

  const sortPost = posts?.slice().sort((a,b) => new Date(a.createdAt) - new Date(b.createdAt)).reverse();

  return (
    <div className="col-span-12 md:col-span-6">
      {loading ? (
        <Loading />
      ): (
        sortPost.map(post => (
          <div className="" key={post._id}>
            <Post post={post}/>
          </div>
        ))
      )}
    </div>
  )
}

export default Posts