import { HiX } from "react-icons/hi";
import { useDispatch, useSelector } from "react-redux";
import LikeComment from "./postComponents/LikeComment";
import { postAction } from "../redux/postSlice";
import Users from "./postComponents/Users";
import DefaultUser from "../assets/default_user.jpg";
import { Link, useNavigate } from "react-router-dom";
import Loading from "./Loading";
import { useGetPostQuery } from "../api/postApi";

const Modal = () => {
  const { showModal } = useSelector((state) => state.post);
  const { data: post, isLoading } = useGetPostQuery(showModal.postId);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleModal = (id) => {
    dispatch(postAction.showModal({ isShow: false }));
    navigate(`/profile/${id}`);
  };

  return (
    <>
      {isLoading ? (
        <Loading />
      ) : (
        <div className="bg-white grid md:grid-rows-6 grid-cols-12 md:grid-flow-col gap-4 border border-slate-300 rounded-md my-2 fixed inset-8 z-20 overflow-hidden">
          <div className="left md:row-span-6 bg-black col-span-12 md:col-span-5">
            <img src={post.image} alt="" className="object-cover mx-auto" />
          </div>
          <div className="header  md:row-span-1 col-span-12 md:col-span-7">
            <div className="flex justify-between items-center my-2">
              <Users post={post} />
              <div className="mx-3">
                <HiX
                  className="text-2xl absolute top-3 right-4"
                  onClick={() =>
                    dispatch(postAction.showModal({ isShow: false }))
                  }
                />
              </div>
            </div>
          </div>
          <div className="footer m-3 md:row-span-5 col-span-12 md:col-span-7">
            <div className="overflow-y-scroll" style={{ height: "40vh" }}>
              <p className="font-bold">Comments</p>
              {post.comments?.length > 0 ? (
                post.comments.map((cmt, index) => (
                  <div className="" key={index}>
                    <button
                      onClick={() => handleModal(cmt.userId._id)}
                      className="flex items-center my-1"
                    >
                      <img
                        className="mr-3 w-8 h-8 object-cover rounded-full"
                        src={
                          cmt.userId.profilePicture
                            ? cmt.userId.profilePicture
                            : DefaultUser
                        }
                        alt=""
                      />
                      <span className="font-medium">{cmt.userId.username}</span>
                    </button>
                    <p className="text-left ml-3 mb-2">{cmt.comment}</p>
                    <hr />
                  </div>
                ))
              ) : (
                <p>No comment yet</p>
              )}
            </div>
            <div className="border-b-2 border-gray-400"></div>
            <LikeComment post={post} />
          </div>
        </div>
      )}
    </>
  );
};

export default Modal;
