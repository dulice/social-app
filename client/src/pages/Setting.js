import React from "react";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import { motion } from "framer-motion";
import { toast } from "react-toastify";
import { userAction } from "../redux/userSlice";
import DefaultUser from "../assets/default_user.jpg";
import { useUpdateUserMutation } from "../api/userApi";
import { fadeInVariant } from "../styles/variants";

const Setting = () => {
  const dispatch = useDispatch();
  const { user, token } = useSelector((state) => state.user.user);
  const [updateUser, { isLoading }] = useUpdateUserMutation();
  const [username, setUsername] = useState(user.username);
  const [bio, setBio] = useState(user.bio);
  const [email, setEmail] = useState(user.email);
  const [phoneNumber, setPhoneNumber] = useState(user.phoneNumber);
  const [hometown, setHometown] = useState(user.hometown);
  const [currentTown, setCurrentTown] = useState(user.currentTown);
  const [profilePicture, setProfilePicture] = useState(user.profilePicture);

  const handleChangeImage = (e) => {
    const file = e.target.files[0];
    const reader = new FileReader();
    reader.readAsDataURL(file);

    reader.onloadend = () => {
      setProfilePicture(reader.result);
    };
  };

  const handleSubmit = async (e) => {
    let imageUrl = null;
    e.preventDefault();
    try {
      if (profilePicture !== user.profilePicture) {
        if (user.publicId) {
          await axios.put(
            `${process.env.REACT_APP_API_URL}/api/upload/destory`,
            {
              publicId: user.publicId,
            }
          );
        }
        const { data: image } = await axios.post(
          `${process.env.REACT_APP_API_URL}/api/upload`,
          { profilePicture }
        );
        imageUrl = image;
      }
      const { data } = await updateUser({
        userId: user._id,
        token,
        username,
        bio,
        email,
        phoneNumber,
        hometown,
        currentTown,
        profilePicture: imageUrl && imageUrl.image,
        publicId: imageUrl && imageUrl.publicId,
      });
      dispatch(userAction.register(data));
      localStorage.setItem("user", JSON.stringify(data));
      toast.success("Update your account successfully!");
    } catch (err) {
      console.log(err);
      toast.error("Cannot update Your Profile");
    }
  };

  return (
    <motion.div
      variants={fadeInVariant}
      initial="hidden"
      animate="visible"
      exit="exit"
      className="max-w-5xl mx-auto px-3 mt-20"
    >
      <form className="mt-3" onSubmit={handleSubmit}>
        <label
          htmlFor="profile"
          className="col-span-1 text-right sr-only md:not-sr-only"
        >
          <img
            className="mx-auto w-28 h-28 object-cover rounded-full"
            src={profilePicture ? profilePicture : DefaultUser}
            alt=""
          />
        </label>
        <input
          onChange={handleChangeImage}
          type="file"
          accept="image/jpg, image/jpeg, image/png, image/svg, image/gif"
          id="profile"
          name="profilePicture"
          className="p-2 text-sm mx-3 mb-3 col-span-4 md:col-span-3 hidden"
        />
        <p className="font-medium my-5">{user.username}</p>

        <div className="grid grid-cols-4">
          <label
            htmlFor="name"
            className="col-span-1 text-right sr-only md:not-sr-only"
          >
            Username:
          </label>
          <input
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            type="text"
            className="p-2 text-sm mx-3 mb-3 col-span-4 md:col-span-3"
            placeholder="Username"
          />

          <label
            htmlFor="bio"
            className="col-span-1 text-right sr-only md:not-sr-only"
          >
            Bio:
          </label>
          <input
            value={bio}
            onChange={(e) => setBio(e.target.value)}
            type="text"
            className="p-2 text-sm mx-3 mb-3 col-span-4 md:col-span-3"
            placeholder="Bio"
          />

          <label
            htmlFor="email"
            className="col-span-1 text-right sr-only md:not-sr-only"
          >
            Email:
          </label>
          <input
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            type="email"
            className="p-2 text-sm mx-3 mb-3 col-span-4 md:col-span-3"
            placeholder="Email"
          />

          <label
            htmlFor="phno"
            className="col-span-1 text-right sr-only md:not-sr-only"
          >
            Phone number:
          </label>
          <input
            value={phoneNumber}
            onChange={(e) => setPhoneNumber(e.target.value)}
            type="text"
            className="p-2 text-sm mx-3 mb-3 col-span-4 md:col-span-3"
            placeholder="Phone number"
          />

          <label
            htmlFor="hometown"
            className="col-span-1 text-right sr-only md:not-sr-only"
          >
            Hometown:
          </label>
          <input
            value={hometown}
            onChange={(e) => setHometown(e.target.value)}
            type="text"
            className="p-2 text-sm mx-3 mb-3 col-span-4 md:col-span-3"
            placeholder="Hometown"
          />

          <label
            htmlFor="city"
            className="col-span-1 text-right sr-only md:not-sr-only"
          >
            Current City:
          </label>
          <input
            value={currentTown}
            onChange={(e) => setCurrentTown(e.target.value)}
            type="text"
            className="p-2 text-sm mx-3 mb-3 col-span-4 md:col-span-3"
            placeholder="Current City"
          />
        </div>
        <button
          type="submit"
          className={`${
            isLoading ? "cursor-wait" : ""
          } py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-gradient-to-r from-purple-500 via-pink-500 to-yellow-500 hover:from-purple-600 hover:via-pink-600 hover:to-yellow-600 focus:from-purple-400 focus:via-pink-400 focus:to-yellow-400 duration-300`}
        >
          {isLoading ? "Updating" : "Update"}
        </button>
      </form>
    </motion.div>
  );
};

export default Setting;
