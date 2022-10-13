import axios from "axios";
import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { postAction } from "../redux/postSlice";
import Modal from "./Modal";

const ExplorePost = ({ post }) => {
  const dispatch = useDispatch();
  const { showModal } = useSelector((state) => state.post);
  const [loading, setLoading] = useState(false);

  const fetchComments = async (id) => {
    setLoading(true);
    dispatch(postAction.showModal(true));
    dispatch(postAction.singlePost(post));
    try {
      const { data } = await axios.get(`/api/posts/${id}`);
      dispatch(postAction.commentsPost(data.comments));
      setLoading(false);
    } catch (err) {
      console.log(err.message);
      setLoading(false);
    }
  };

  return (
    <div>
      <div className="profile-image-container mb-3 cursor-pointer">
        <img src={post.image} alt="" className="" onClick={() => fetchComments(post._id)} />
      </div>
      {showModal && <Modal loading={loading} />}
    </div>
  );
};

export default ExplorePost;
