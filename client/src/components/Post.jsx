import React from 'react'
import moment from 'moment';
import { HiOutlineDotsHorizontal } from 'react-icons/hi';
import { TbMessageCircle2, TbSend } from 'react-icons/tb';
import { BsBookmark, BsEmojiSmile, BsHeart, BsHeartFill } from 'react-icons/bs'
import { useSelector } from 'react-redux';
import { useEffect } from 'react';
import axios from 'axios';
import { useState } from 'react';
import Modal from './Modal';

const Post = ({post}) => {
    const user = useSelector(state => state.user.user);
    const [users, setUsers] = useState([]);
    const [comment, setComment] = useState('');
    const [comments, setComments] = useState([]);
    const [like, setLike] = useState(false);
    const [loading, setLoading] = useState(false);
    const [showCommentModal, setShowCommentModal] = useState(false);

    useEffect(() => {
        const fetchUsers = async () => {
            const { data } = await axios.get('/api/users')
            setUsers(data);
        }

        if(post.likes.includes(user._id)) {
            setLike(true);
        }

        fetchUsers();
    },[user._id, post]);

    const findUser = users?.find(user => user._id === post.userId);

    const fetchComments = async (id) => {
        setShowCommentModal(true);
        setLoading(true);
        try {
            const { data } = await axios.get(`/api/posts/${id}`);
            setComments(data.comments);
            // console.log(data.comments)
            setLoading(false);
        } catch (err) {
            console.log(err.message);
            setLoading(false);
        }
    }

    const handleLike = async (id) => {
        setLike(!like);
        await axios.put(`/${id}/like`, {
            userId: user._id
        });
    };

    const handleComment = async (id) => {
        try{
            const { data } = await axios.put(`/api/posts/comment/${id}`, {
                username: user.username,
                profilePicture: user.profilePicture,
                comment
            });
            console.log(data);
        } catch (err) {
            console.log(err.message);
        }
    }

  return (
    <div key={post._id}>
        <div className='border border-slate-300 rounded-md my-2'>
            <div className="hearder">
                <div className="flex justify-between items-center my-2">
                    <div className="flex items-center">
                        {user?.profilePicture || findUser ? (
                            <img className='mx-3 w-8 h-8 object-cover rounded-full' src={findUser?.profilePicture} alt="" />
                        ): (
                            <img className='mx-3 w-8 h-8 object-cover rounded-full' src="https://www.business2community.com/wp-content/uploads/2017/08/blank-profile-picture-973460_640.png" alt="" />
                        )}
                        <span className='font-medium'>{findUser?.username}</span>
                    </div>
                    <div className="mx-3">
                        <HiOutlineDotsHorizontal />
                    </div>
                </div>
            </div>
            <div className="body bg-black">
            <img src={post.image} alt="" className='object-cover mx-auto' />
            </div>
            <div className="footer m-3">
            <div className="flex justify-between items-center my-3 text-2xl">
                <div className="flex">
                    {like ? (
                        <button onClick={() => handleLike(post._id)} className='mr-3 cursor-pointer text-red-600 duration-300'>
                            <BsHeartFill/>
                        </button>
                    ) : (

                        <button onClick={() => handleLike(post._id)} className='mr-3 cursor-pointer hover:text-gray-600 duration-300'>
                            <BsHeart/>
                        </button>
                    )}
                    <button className='mr-3 cursor-pointer hover:text-gray-600 duration-300'>
                        <TbMessageCircle2 onClick={() => fetchComments(post._id)}/>
                    </button>
                    <button className='mr-3 cursor-pointer hover:text-gray-600 duration-300'>
                        <TbSend/>
                    </button>
                </div>
                <div className="cursor-pointer hover:text-gray-600 duration-300">
                    <BsBookmark />
                </div>
            </div>
            <div className='text-left text-gray-600 leading-7'>
                <p className=''>{post.likes.length}{post.likes.length > 1 ? " people like this post." : " person like this post."}</p>
                <p className=' text-black'>{post.description.length > 30 ? post.description.substring(0, 30) : post.description}
                    <span>{post.description.length > 30 && '...more'}</span>
                </p>
                <p className='text-sm uppercase text-gray-500'>{moment(post.createdAt).fromNow()}</p>
                <form onSubmit={(e) =>{
                    e.preventDefault();
                    handleComment(post._id);
                }}>
                    <div className='flex items-center w-full text-gray-900 my-3'>
                        <BsEmojiSmile className='mr-3 text-2xl' />
                        <input value={comment} onChange={(e) => setComment(e.target.value)} name="comment" type="text" className="w-full px-3 sm:text-sm py-2 focus:outline-none" placeholder="Add a comment..."/>
                        { comment && <button type='submit' className='font-sm font-medium text-blue-500'>Post</button>}
                    </div>
                </form>
            </div>
            </div>
        </div>
        {showCommentModal && (
            <Modal post={post} setShowCommentModal={setShowCommentModal} comments={comments} loading={loading}/>
        )}
    </div>
  )
}

export default Post