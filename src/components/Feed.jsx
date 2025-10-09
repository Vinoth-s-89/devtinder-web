import { useDispatch, useSelector } from "react-redux";
import UserCard from "./shared/UserCard";
import { useEffect } from "react";
import { apiPaths, appApi } from "../utils/api";
import { removeFeed, setFeed } from "../utils/feedSlice";
import useToast from "../utils/useToast";

const Feed = () => {
  const feeds = useSelector((state) => state.feed);
  const user = useSelector((state) => state.user);
  const dispatch = useDispatch();
  const { showToast } = useToast();

  const fetchFeed = async () => {
    try {
      const { data } = await appApi.get(apiPaths.feed);
      dispatch(setFeed(data));
    } catch (error) {}
  };

  const sendRequest = async (status, userId) => {
    try {
      const { data } = await appApi.post(
        `${apiPaths.sendRequest}/${status}/${userId}`
      );
      showToast(data?.message);
      dispatch(removeFeed(userId));
    } catch (error) {}
  };

  useEffect(() => {
    if (user) {
      fetchFeed();
    }
  }, [user]);

  return (
    <div className="flex justify-center items-center h-full">
      <UserCard
        user={feeds?.[0]}
        ActionComponent={
          <div className="card-actions justify-end">
            <button
              className="btn btn-sm btn-secondary"
              onClick={() => sendRequest("ignored", feeds?.[0]._id)}
            >
              Ignore
            </button>
            <button
              className="btn btn-sm btn-primary"
              onClick={() => sendRequest("interested", feeds?.[0]._id)}
            >
              Interested
            </button>
          </div>
        }
      />
    </div>
  );
};
export default Feed;
