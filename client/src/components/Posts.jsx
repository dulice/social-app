import { useSelector } from "react-redux";
import Post from "./Post";
import Loading from "./Loading";
import { useGetTimeLinePostsQuery } from "../api/postApi";
import { Error } from "../pages";
import Modal from "./Modal";
import { motion } from "framer-motion";
import { slideUp } from "../styles/variants";

const Posts = () => {
  const { user } = useSelector((state) => state.user.user);
  const { showModal } = useSelector((state) => state.post);

  const {
    data: posts,
    isLoading,
    isError,
    error,
  } = useGetTimeLinePostsQuery(
    user.followings?.length > 1 ? `/timeline/${user._id}` : "/"
  );

  if (isLoading) return <Loading />;
  if (isError) return <Error error={error} />;
  return (
    <>
      <motion.div
        variants={slideUp}
        initial="hidden"
        animate="visible"
        exit="exit"
        className="col-span-12 md:col-span-6"
      >
        {posts.map((post) => (
          <div key={post._id}>
            <Post post={post} />
          </div>
        ))}
      </motion.div>
      {showModal.isShow && <Modal />}
    </>
  );
};

export default Posts;
