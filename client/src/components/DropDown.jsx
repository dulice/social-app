import React, { Fragment } from "react";
import { Menu, Transition } from "@headlessui/react";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import { useDeletePostMutation } from "../api/postApi";
import { HiDotsHorizontal, HiPencil, HiTrash } from "react-icons/hi";

const DropDown = ({ post }) => {
  const { user, token } = useSelector((state) => state.user.user);
  const [deletePost] = useDeletePostMutation();
  const handleDelete = async () => {
    deletePost({ id: post._id, token });
  };
  return (
    <>
      {user._id === post.userId._id && (
        <Menu as="div" className="relative inline-block text-left">
          <div>
            <Menu.Button>
              <HiDotsHorizontal />
            </Menu.Button>
          </div>
          <Transition
            as={Fragment}
            enter="transition ease-out duration-100"
            enterFrom="transform opacity-0 scale-95"
            enterTo="transform opacity-100 scale-100"
            leave="transition ease-in duration-75"
            leaveFrom="transform opacity-100 scale-100"
            leaveTo="transform opacity-0 scale-95"
          >
            <Menu.Items className="absolute right-0 mt-2 w-56 origin-top-right divide-y divide-gray-100 rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
              <div className="px-1 py-1 ">
                <Menu.Item>
                  {({ active }) => (
                    <Link
                      to={`/post/${post._id}/edit`}
                      className={`${
                        active ? "bg-gray-200" : "text-gray-900"
                      } group flex w-full items-center rounded-md px-2 py-2 text-sm`}
                    >
                      <HiPencil className="mr-2 h-5 w-5" aria-hidden="true" />
                      Edit
                    </Link>
                  )}
                </Menu.Item>
                <Menu.Item>
                  {({ active }) => (
                    <button
                      onClick={handleDelete}
                      className={`${
                        active ? "bg-gray-200" : "text-gray-900"
                      } group flex w-full items-center rounded-md px-2 py-2 text-sm`}
                    >
                      <HiTrash className="mr-2 h-5 w-5" aria-hidden="true" />
                      Delete
                    </button>
                  )}
                </Menu.Item>
              </div>
            </Menu.Items>
          </Transition>
        </Menu>
      )}
    </>
  );
};

export default DropDown;
