import React, { useEffect, useState } from "react";
import { apiPaths, appApi } from "../utils/api";
import UserInfoCard from "./shared/UserInfoCard";
import Toast from "./shared/Toast";

const Requests = () => {
  const [requests, setRequests] = useState([]);
  const [message, setMessage] = useState("");

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
      setMessage(data?.message);
      setTimeout(() => setMessage(""), 2000);
      fetchRequests();
    } catch (error) {}
  };

  useEffect(() => {
    fetchRequests();
  }, []);

  return (
    <div className="h-full flex flex-col items-center py-3.5 gap-y-3.5">
      <div className="text-3xl tracking-wide">Connection Requests</div>
      <UserInfoCard
        userData={requests}
        ActionComponent={({ data }) => {
          return (
            <div className="col-span-2 w-full flex justify-end gap-2.5">
              <button
                className="btn btn-sm btn-accent"
                onClick={() => reviewRequest(data._id, "accepted")}
              >
                Accept
              </button>
              <button
                className="btn btn-sm btn-error"
                onClick={() => reviewRequest(data._id, "rejected")}
              >
                Reject
              </button>
            </div>
          );
        }}
      />
      <Toast message={message} />
    </div>
  );
};

export default Requests;
