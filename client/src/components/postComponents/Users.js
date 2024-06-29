import DefaultUser from "../../assets/default_user.jpg";
import { Link } from "react-router-dom";
import DropDown from "../DropDown";
import { useDispatch } from "react-redux";
import { postAction } from "../../redux/postSlice";

const Users = ({ post }) => {
  const dispatch = useDispatch();

  return (
    <>
      <Link
        to={`/profile/${post.userId?._id}`}
        onClick={() => dispatch(postAction.showModal({isShow: false}))}
        className="flex items-center hover:underline"
      >
        <img
          className="mx-3 w-8 h-8 object-cover rounded-full"
          src={
            post.userId?.profilePicture
              ? post.userId.profilePicture
              : DefaultUser
          }
          alt=""
        />
        <span className="font-medium">{post.userId?.username}</span>
      </Link>
      <div className="mx-3">
        <DropDown post={post}/>
      </div>
    </>
  );
};

export default Users;
