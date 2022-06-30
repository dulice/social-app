import axios from 'axios';
import React, { useState } from 'react'
import Modal from './Modal';

const ExplorePost = ({post}) => {
    const [comments, setComments] = useState([]);
    const [showCommentModal, setShowCommentModal] = useState(false);
    const [loading, setLoading] = useState(false);
    
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
    };

  return (  
        <div>
            <div className="profile-image-container mb-3 cursor-pointer">
                <img src={post.image} alt="" className='' onClick={() => fetchComments(post._id)} />
            </div>
            {showCommentModal && (
                <Modal setShowCommentModal={setShowCommentModal} post={post} comments={comments} loading={loading}/>
            )}
        </div>
  )
}

export default ExplorePost