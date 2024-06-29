import { useSelector } from "react-redux";
import ExplorePost from "../components/ExplorePost";
import Loading from "../components/Loading";
import { useGetnotOwnerPostsQuery } from "../api/postApi";
import Error from "./Error";

const Explore = () => {
  const { user } = useSelector((state) => state.user.user);
  const {
    data: posts,
    isLoading,
    isError,
    error,
  } = useGetnotOwnerPostsQuery(user._id);
  
  if (isLoading) return <Loading />;
  if (isError) return <Error error={error} />;
  return (
    <div className="max-w-5xl mx-auto px-3 text-left mt-20">
      <div className="divide-y grid grid-cols-12 items-center mt-5 gap-6">
        {posts.map((post) => (
          <div key={post._id} className="col-span-4">
            <ExplorePost post={post} />
          </div>
        ))}
      </div>
    </div>
  );
};

export default Explore;
