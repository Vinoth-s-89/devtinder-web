import React, { useEffect, useState } from "react";
import { apiPaths, appApi } from "../utils/api";
import UserInfoCard from "./shared/UserInfoCard";
import useToast from "../utils/useToast";

const Requests = () => {
  const [requests, setRequests] = useState([]);
  const { showToast } = useToast();

  const fetchRequests = async () => {
    try {
      const { data } = await appApi.get(apiPaths.requests);
      setRequests(data);
    } catch (error) {}
  };

  const reviewRequest = async (connectionId, action) => {
    try {
      const { data } = await appApi.post(
        `${apiPaths.reviewRequest}/${action}/${connectionId}`
      );
      showToast(data?.message);
      fetchRequests();
    } catch (error) {}
  };

  useEffect(() => {
    fetchRequests();
  }, []);

  return (
    <div className="h-full flex flex-col items-center py-3.5 gap-y-3.5">
      <div className="text-3xl tracking-wide">Connection Requests</div>
      <div className="min-w-[300px] w-[50%] max-w-[700px] flex flex-col gap-3.5">
        {requests.map((request) => (
          <UserInfoCard
            data={request}
            key={request._id}
            ActionComponent={
              <div className="col-span-2 w-full flex justify-end gap-2.5">
                <button
                  className="btn btn-sm btn-accent"
                  onClick={() => reviewRequest(request._id, "accepted")}
                >
                  Accept
                </button>
                <button
                  className="btn btn-sm btn-error"
                  onClick={() => reviewRequest(request._id, "rejected")}
                >
                  Reject
                </button>
              </div>
            }
          />
        ))}
      </div>
    </div>
  );
};

export default Requests;
