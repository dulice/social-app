import { useLocation } from "react-router-dom";
import { motion } from "framer-motion";
import Loading from "../components/Loading";
import Post from "../components/Post";
import { useGetSearchPostsQuery } from "../api/postApi";
import { fadeInVariant } from "../styles/variants";

const SearchResult = () => {
  const { search } = useLocation();
  let searchInput = new URLSearchParams(search).get("q");
  const { data: posts, isLoading } = useGetSearchPostsQuery(searchInput);

  if (isLoading) return <Loading />;
  return (
    <motion.div
      variants={fadeInVariant}
      initial="hidden"
      animate="visible"
      exit="exit"
      className="max-w-3xl mx-auto px-3"
    >
      <div className="col-span-12 md:col-span-6 mt-20">
        {posts.length === 0 ? (
          <p className="font-medium mt-10">No Result Found</p>
        ) : (
          posts.map((post) => (
            <div className="" key={post._id}>
              <Post post={post} />
            </div>
          ))
        )}
      </div>
    </motion.div>
  );
};

export default SearchResult;
