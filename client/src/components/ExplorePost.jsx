import { useDispatch, useSelector } from "react-redux";
import { motion } from "framer-motion";
import { postAction } from "../redux/postSlice";
import Modal from "./Modal";
import { fadeInVariant } from "../styles/variants";

const ExplorePost = ({ post }) => {
  const dispatch = useDispatch();
  const { showModal } = useSelector((state) => state.post);

  const fetchComments = async (id) => {
    dispatch(postAction.showModal({ isShow: true, postId: id }));
  };

  return (
    <div>
      <motion.div
        variants={fadeInVariant}
        initial="hidden"
        animate="visible"
        exit="exit"
        className="profile-image-container mb-3 cursor-pointer"
      >
        <img src={post.image} alt="" onClick={() => fetchComments(post._id)} />
      </motion.div>
      {showModal.isShow && <Modal />}
    </div>
  );
};

export default ExplorePost;
