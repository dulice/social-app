import React from "react";
import { HiX } from "react-icons/hi";
import { useDispatch, useSelector } from "react-redux";
import LikeComment from "./postComponents/LikeComment";
import { postAction } from "../redux/postSlice";
import Users from "./postComponents/Users";
import axios from "axios";
import { useState } from "react";
import Loading from "./Loading";

const Modal = ({loading}) => {
  const dispatch = useDispatch();
  const { comments, post } = useSelector((state) => state.post);

  return (
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
              onClick={() => dispatch(postAction.showModal(false))}
            />
          </div>
        </div>
      </div>
      <div className="footer m-3 md:row-span-5 col-span-12 md:col-span-7">
        <div className="overflow-y-scroll" style={{ height: "40vh" }}>
          {comments && <p className="font-bold">Comments</p>}
          {loading ? <Loading /> : comments.length > 0 ? (
            comments.map((cmt, index) => (
              <div className="" key={index}>
                <div className="flex justify-between items-center my-2">
                  <div className="flex items-center">
                    {cmt.profilePicture ? (
                      <img
                        className="mr-3 w-8 h-8 object-cover rounded-full"
                        src={cmt?.profilePicture}
                        alt=""
                      />
                    ) : (
                      <img
                        className="mr-3 w-8 h-8 object-cover rounded-full"
                        src="https://www.business2community.com/wp-content/uploads/2017/08/blank-profile-picture-973460_640.png"
                        alt=""
                      />
                    )}
                    <span className="font-medium">{cmt?.username}</span>
                  </div>
                </div>
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
  );
};

export default Modal;
