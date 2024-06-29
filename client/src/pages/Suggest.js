import { useSelector } from "react-redux";
import { motion } from "framer-motion";
import Loading from "../components/Loading";
import SuggestUser from "../components/SuggestUser";
import { useGetToFollowUserQuery } from "../api/userApi";
import Error from "./Error";
import { fadeInVariant } from "../styles/variants";

const Suggest = () => {
  const { user } = useSelector((state) => state.user.user);
  const { data, isLoading, error } = useGetToFollowUserQuery({
    userId: user._id,
    limit: "",
  });

  if (isLoading) return <Loading />;
  if (error) return <Error error={error.message} />;
  return (
    <motion.div
      variants={fadeInVariant}
      initial="hidden"
      animate="visible"
      exit="exit"
      className="max-w-xl mx-auto px-3 mt-20"
    >
      <p className="capitalize font-medium text-left">Suggested</p>
      <div className="users">
        {data.map((user) => (
          <div key={user._id}>
            <SuggestUser user={user} suggest={true} />
          </div>
        ))}
      </div>
    </motion.div>
  );
};

export default Suggest;
