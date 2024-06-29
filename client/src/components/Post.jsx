import LikeComment from "./postComponents/LikeComment";
import Users from "./postComponents/Users";

let Post = ({ post }) => {
  return (
    <div className="border border-slate-300 rounded-md my-2">
      <div className="header">
        <div className="flex justify-between items-center my-2">
          <Users post={post} />
        </div>
      </div>
      <div className="body bg-black">
        <img src={post.image} alt="" className="object-cover mx-auto" />
      </div>
      <div className="footer m-3">
        <LikeComment post={post} />
      </div>
    </div>
  );
};

export default Post;
