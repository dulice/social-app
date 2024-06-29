import axios from "axios";
import React, { useState } from "react";
import { MdOutlineAddPhotoAlternate } from "react-icons/md";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { useAddPostMutation } from "../api/postApi";

const UploadPost = () => {
  const navigate = useNavigate();
  const {user, token} = useSelector((state) => state.user.user);
  const [addPost, { isLoading }] = useAddPostMutation();
  const [image, setImage] = useState("");
  const [description, setDescription] = useState("");

  const previewFile = (file) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);

    reader.onloadend = () => {
      setImage(reader.result);
    };
  };

  const handleChangeImage = (e) => {
    const file = e.target.files[0];
    previewFile(file);
  };

  const handlePost = async (e) => {
    e.preventDefault();
    if(image === "" || description === "") return toast.error("Please fill all the fields.")
    try {
      const { data: imageData } = await axios.post(
        `${process.env.REACT_APP_API_URL}/api/upload/postimage`,
        { image }
      );
      await addPost({
        token,
        userId: user._id,
        image: imageData.image,
        publicId: imageData.publicId,
        description,
      });
      toast.success("You post has been post.");
      setTimeout(() => {
        navigate("/");
      }, 1000);
    } catch (err) {
      console.log(err.message);
    }
  };
  return (
    <div className="max-w-3xl mx-auto mt-20 px-3">
      <form action="" onSubmit={handlePost}>
        {image ? (
          <div className="profile-image-container">
            <img src={image} alt="" />
          </div>
        ) : (
          <div className="border p-5">
            <label htmlFor="image" className="mx-auto">
              <MdOutlineAddPhotoAlternate className="mx-auto text-5xl my-5" />
              <p className="text-2xl mb-5">Add your photo</p>
            </label>
            <input
              type="file"
              id="image"
              className="hidden"
              onChange={handleChangeImage}
            />
          </div>
        )}

        <textarea
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          className="w-full focus:outline-none border mt-3"
          rows="10"
          placeholder="Description..."
        ></textarea>
        <div className="flex justify-end my-3">
          <button className={`py-2 px-4 text-sm font-medium rounded-md text-white bg-gradient-to-r from-purple-400 via-pink-400 to-yellow-400 ${isLoading ? "cursor-wait" : ""}`}>
            {isLoading ? "Posting" : "Post"}
          </button>
        </div>
      </form>
    </div>
  );
};

export default UploadPost;
