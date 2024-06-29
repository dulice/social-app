import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { socket } from "../../context/appContext";
import { postAction } from "../../redux/postSlice";
import { TbMessageCircle2, TbSend } from "react-icons/tb";
import { BsBookmark, BsEmojiSmile, BsHeart, BsHeartFill } from "react-icons/bs";
import moment from "moment";
import { useAddCommentMutation } from "../../api/postApi";

const LikeComment = ({ post }) => {
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.user.user);
  const { likeCount } = useSelector((state) => state.post);
  const [addComment] = useAddCommentMutation();
  const [like, setLike] = useState(false);
  const [comment, setComment] = useState("");
  const [initialLike, setInitialLike] = useState(true);

  useEffect(() => {
    if (post.likes?.includes(user._id)) {
      setLike(true);
    }
  }, [user._id, post.likes]);

  const handleLike = (id) => {
    setLike(!like);
    setInitialLike(false);
    socket.emit("like", id, user._id);

    socket.off("likeUnlike").on("likeUnlike", (payload) => {
      dispatch(postAction.singlePost(payload));
      if (payload.likes.includes(user._id)) {
        setLike(false);
        dispatch(postAction.likeCount(payload.likes.length - 1));
      } else {
        setLike(true);
        dispatch(postAction.likeCount(payload.likes.length + 1));
      }
    });
  };

  const fetchComments = async (id) => {
    dispatch(postAction.showModal({isShow: true, postId: id}));
  };

  const handleComment = async (e) => {
    e.preventDefault();
    await addComment({ id: post._id, userId: user._id, comment });
    setComment("");
  };
  return (
    <>
      <div className="flex justify-between items-center my-3 text-2xl">
        <div className="flex">
          {like ? (
            <button
              onClick={() => handleLike(post._id)}
              className="mr-3 cursor-pointer text-red-600 duration-300"
            >
              <BsHeartFill />
            </button>
          ) : (
            <button
              onClick={() => handleLike(post._id)}
              className="mr-3 cursor-pointer hover:text-gray-600 duration-300"
            >
              <BsHeart />
            </button>
          )}
          <button
            className="mr-3 cursor-pointer hover:text-gray-600 duration-300"
            onClick={() => fetchComments(post._id)}
          >
            <TbMessageCircle2 />
          </button>
          <button className="mr-3 cursor-pointer hover:text-gray-600 duration-300">
            <TbSend />
          </button>
        </div>
        <div className="cursor-pointer hover:text-gray-600 duration-300">
          <BsBookmark />
        </div>
      </div>
      <div className="text-left text-gray-600 leading-7">
        <p className="">
          {initialLike ? post.likes?.length : likeCount}{" "}
          {likeCount > 1
            ? " people like this post."
            : " person like this post."}
        </p>
        <p className=" text-black">
          {post.description?.length > 30
            ? post.description.substring(0, 30) + "...more"
            : post.description}
        </p>
        <p className="text-sm uppercase text-gray-500">
          {moment(post.createdAt).fromNow()}
        </p>
        <form onSubmit={handleComment}>
          <div className="flex items-center w-full text-gray-900 my-3">
            <BsEmojiSmile className="mr-3 text-2xl" />
            <input
              value={comment}
              onChange={(e) => setComment(e.target.value)}
              name="comment"
              type="text"
              className="w-full px-3 sm:text-sm py-2 focus:outline-none"
              placeholder="Add a comment..."
            />
            {comment && (
              <button
                type="submit"
                className="font-sm font-medium text-blue-500"
              >
                Post
              </button>
            )}
          </div>
        </form>
      </div>
    </>
  );
};

export default LikeComment;
