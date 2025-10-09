import { useDispatch, useSelector } from "react-redux";
import UserCard from "./shared/UserCard";
import { useEffect } from "react";
import { apiPaths, appApi } from "../utils/api";
import { setFeed } from "../utils/feedSlice";

const Feed = () => {
  const feeds = useSelector((state) => state.feed);
  const user = useSelector((state) => state.user);
  const dispatch = useDispatch();

  const fetchFeed = async () => {
    try {
      const { data } = await appApi.get(apiPaths.feed);
      dispatch(setFeed(data));
    } catch (error) {}
  };

  useEffect(() => {
    if (!feeds && user) {
      fetchFeed();
    }
  }, [feeds, user]);

  return (
    <div className="flex justify-center items-center h-full">
      <UserCard user={feeds?.[0]} />
    </div>
  );
};
export default Feed;
