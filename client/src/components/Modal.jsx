import React, { useEffect, useState } from 'react'
import { HiX } from 'react-icons/hi';
import { TbMessageCircle2, TbSend } from 'react-icons/tb';
import { BsBookmark, BsEmojiSmile, BsHeart, BsHeartFill } from 'react-icons/bs'
import { useSelector } from 'react-redux';
import Loading from './Loading';
import moment from 'moment';
import axios from 'axios';

const Modal = ({post, setShowCommentModal, comments, loading}) => {
    const user = useSelector(state => state.user.user);
    const [users, setUsers] = useState([]);
    const [comment, setComment] = useState('');
    const [like, setLike] = useState(false);

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
    const findUser = users.find(user => user._id === post.userId);

    const handleLike = async (id) => {
        setLike(!like);
        await axios.put(`/${id}/like`, {
            userId: user._id
        });
    };

    const handleComment = async (id) => {
        try{
            await axios.put(`/api/posts/comment/${id}`, {
                username: user.username,
                profilePicture: user.profilePicture,
                comment
            });
            // console.log(data);
        } catch (err) {
            console.log(err.message);
        }
    }

  return (
    <div className='bg-white grid md:grid-rows-6 grid-cols-12 md:grid-flow-col gap-4 border border-slate-300 rounded-md my-2 fixed inset-8 z-20 overflow-hidden'>

            <div className="left md:row-span-6 bg-black col-span-12 md:col-span-5">
                <img src={post.image} alt="" className='object-cover mx-auto' />
            </div>

            <div className="hearder  md:row-span-1 col-span-12 md:col-span-7">
                <div className="flex justify-between items-center my-2">
                    <div className="flex items-center">
                        {user.profilePicture && findUser ? (
                            <img className='mx-3 w-8 h-8 object-cover rounded-full' src={findUser?.profilePicture} alt="" />
                        ): (
                            <img className='mx-3 w-8 h-8 object-cover rounded-full' src="https://www.business2community.com/wp-content/uploads/2017/08/blank-profile-picture-973460_640.png" alt="" />
                        )}
                        <span className='font-medium'>{findUser?.username}</span>
                    </div>

                    <div className="mx-3">
                        <HiX className='text-2xl absolute top-3 right-4' onClick={(e) => setShowCommentModal(false)} />
                    </div>
                </div>
            </div>            
            <div className="footer m-3 md:row-span-5 col-span-12 md:col-span-7">
                {loading ? <Loading /> : (
                    comments.length > 0 ? (
                        comments.map((cmt, index) => (
                            <div className="" key={index}>
                                <div className="flex justify-between items-center my-2">
                                    <div className="flex items-center">
                                        {cmt.profilePicture ? (
                                            <img className='mr-3 w-8 h-8 object-cover rounded-full' src={cmt?.profilePicture} alt="" />
                                        ): (
                                            <img className='mr-3 w-8 h-8 object-cover rounded-full' src="https://www.business2community.com/wp-content/uploads/2017/08/blank-profile-picture-973460_640.png" alt="" />
                                        )}
                                        <span className='font-medium'>{cmt?.username}</span>
                                    </div>
                                </div>
                                <p className='text-left ml-3 mb-2'>{cmt.comment}</p>
                                <hr />
                            </div>
                        ))
                    ) : (
                        <p>No comment yet</p>
                    )
                )}

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
                            <TbMessageCircle2 onClick={() => setShowCommentModal(true)}/>
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
  )
}

export default Modal