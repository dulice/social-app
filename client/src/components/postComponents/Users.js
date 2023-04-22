import axios from "axios";
import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { HiOutlineDotsHorizontal } from "react-icons/hi";
import { toast } from "react-toastify";
import Loading from "../Loading";
import DefaultUser from "../../assets/default_user.jpg";

const Users = ({ post }) => {
  const user = useSelector((state) => state.user.user);
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchUsers = async () => {
      setLoading(true);
      try {
        const { data } = await axios.get("/api/users");
        setUsers(data);
        setLoading(false);
      } catch (err) {
        setLoading(false);
        if (err.response) {
          toast.error(err.response.data.message);
        }
      }
    };
    fetchUsers();
  }, [user._id, post]);

  const findUser = users?.find((user) => user._id === post.userId);
  return (
    <>
      {loading ? (
        <Loading />
      ) : (
        <>
          <div className="flex items-center">
            {findUser && findUser.profilePicture ? (
              <img
                className="mx-3 w-8 h-8 object-cover rounded-full"
                src={findUser.profilePicture}
                alt=""
              />
            ) : (
              <img
                className="mx-3 w-8 h-8 object-cover rounded-full"
                src={DefaultUser}
                alt=""
              />
            )}
            <span className="font-medium">{findUser?.username}</span>
          </div>
          <div className="mx-3">
            <HiOutlineDotsHorizontal />
          </div>
        </>
      )}
    </>
  );
};

export default Users;
