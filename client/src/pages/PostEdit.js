import axios from "axios";
import React, { useEffect, useState } from "react";
import { MdOutlineAddPhotoAlternate } from "react-icons/md";
import { useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { toast } from "react-toastify";
import { useGetPostQuery, useUpdatePostMutation } from "../api/postApi";

const PostEdit = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { user, token } = useSelector((state) => state.user.user);
  const { data, isLoading } = useGetPostQuery(id);
  const [image, setImage] = useState();
  const [description, setDescription] = useState();
  const [updatePost] = useUpdatePostMutation();
  const [isUpdating, setIsUpdating] = useState(false);

  useEffect(() => {
    if (!isLoading) {
      setImage(data.image);
      setDescription(data.description);
    }
  }, [isLoading]);

  const handleChangeImage = (e) => {
    const file = e.target.files[0];
    const reader = new FileReader();
    reader.readAsDataURL(file);

    reader.onloadend = () => {
      setImage(reader.result);
    };
  };

  const handlePost = async (e) => {
    setIsUpdating(true);
    e.preventDefault();
    if (image === "" || description === "")
      return toast.error("Please fill all the fields.");
    try {
      if (data.image !== image) {
        await axios.put(`${process.env.REACT_APP_API_URL}/api/upload/destory`, {
          publicId: data.publicId,
        });
        const { data: imageData } = await axios.post(
          `${process.env.REACT_APP_API_URL}/api/upload/postimage`,
          { image }
        );
        await updatePost({
          id,
          token,
          image: imageData.image,
          publicId: imageData.publicId,
          userId: user._id,
          description,
        });
      } else {
        await updatePost({
          id,
          token,
          userId: user._id,
          description,
        });
      }
      setIsUpdating(false);
      toast.success("You post has been update.");
      setTimeout(() => {
        navigate("/");
      }, 1000);
    } catch (err) {
      console.log(err);
      setIsUpdating(false);
    }
  };
  return (
    <div className="max-w-3xl mx-auto mt-20 px-3">
      <form action="" onSubmit={handlePost}>
        <div className="border p-5">
          <label htmlFor="image" className="mx-auto">
            {image ? (
              <div className="profile-image-container">
                <img src={image} alt="" />
              </div>
            ) : (
              <>
                <MdOutlineAddPhotoAlternate className="mx-auto text-5xl my-5" />
                <p className="text-2xl mb-5">Add your photo</p>
              </>
            )}
          </label>
          <input
            type="file"
            id="image"
            className="hidden"
            onChange={handleChangeImage}
          />
        </div>
        <textarea
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          className="w-full focus:outline-none border mt-3"
          rows="10"
          placeholder="Description..."
        ></textarea>
        <div className="flex justify-end my-3">
          <button
            className={`py-2 px-4 text-sm font-medium rounded-md text-white bg-gradient-to-r from-purple-400 via-pink-400 to-yellow-400 ${
              isUpdating ? "cursor-wait" : ""
            }`}
          >
            {isUpdating ? "Updating" : "Update"}
          </button>
        </div>
      </form>
    </div>
  );
};

export default PostEdit;
